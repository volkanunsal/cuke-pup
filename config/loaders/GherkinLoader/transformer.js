const { parse } = require('stucumber/dist/parser');
module.exports = class Transformer {
  transformFeature(f, rd, s) {
    const tRd = rd.map((r) => this.transformRuleDeclaration(r).trim()).join('');
    const ts = s.map((s) => this.transformScenario(s));
    const name = this.getFeatureName(f);
    return `
  // ${name}
  const feature = ${this.getContext(f.name.value, f.annotations)};
  await Promise.all([
    ${tRd}
  ]);
  await _cucumber.enterFeature(feature);
  await Promise.all([
    ${ts}.map(v => v())
  ]);
  await _cucumber.exitFeature(feature);
    }`;
  }
  transformRuleDeclaration(r) {
    const name = JSON.stringify(r.template.value);
    const rulesStr = r.rules
      .map((rule) => this.transformRule(rule, true))
      .join('');
    return `_cucumber.defineRule(${name}, (world, params) => Promise.resolve()
          ${rulesStr})`;
  }
  getScenarioName(s) {
    return s.name.value;
  }
  getContext(name, annotations, rules) {
    const context = { name, annotations, meta: {} };
    let json = JSON.stringify(context);
    const str = json.slice(0, -1);
    if (rules) {
      const steps = rules.map((rule) => ({
        name: rule.value,
        line: rule.location.line,
        keyword: rule.keyword,
      }));
      json = `${str}, "feature": feature, "steps": ${JSON.stringify(steps)}}`;
    } else {
      json = `${str}, "filename": "NOT_SUPPORTED"}`;
    }
    return json;
  }
  transformScenario(scenario) {
    const sName = this.getScenarioName(scenario);
    const { annotations, rules: scenarioRules } = scenario;
    const rules = scenarioRules.map((r) => this.transformRule(r));
    const context = this.getContext(sName, annotations, scenarioRules);
    return `() => {
      // ${sName}
      const world = _cucumber.createWorld();
      const scenario = ${context};

      const chain = _cucumber.enterScenario(world, scenario)
        ${rules.join('\n\t\t\t\t')};
      
      return promiseFinally(chain, () => {
        _cucumber.exitScenario(world, scenario)
      });
  }`;
  }
  transformRule(rule, isTemplate) {
    var _a;
    const name = JSON.stringify(rule.value);
    const data = (
      (_a = rule.data) === null || _a === void 0 ? void 0 : _a.length
    )
      ? JSON.stringify(rule.data)
      : 'null';
    const template = isTemplate ? ', params' : '""';
    return `.then(() => { 
          _cucumber.rule(world, ${name}, ${data}, ${template}) 
        })`;
  }
  getFeatureName(feature) {
    return 'Feature: ' + feature.name.value;
  }
  transformFile(code) {
    return `
import { cucumber } from "stucumber";
import promiseFinally from 'promise.prototype.finally';
const _cucumber = cucumber.clone();

export default async function Features(obj) {
  ${code}
}
    `;
  }
  transform(source) {
    const feature = parse(source);
    const background = feature.background || [];
    const ds = feature.ruleDeclarations || [];
    const scenarios = feature.scenarios.map((scenario) => {
      return Object.assign(Object.assign({}, scenario), {
        rules: [...background, ...scenario.rules],
      });
    });
    return this.transformFile(this.transformFeature(feature, ds, scenarios));
  }
};
