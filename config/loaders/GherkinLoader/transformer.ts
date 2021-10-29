import {
  Annotation,
  Feature,
  parse,
  Rule,
  RuleDeclaration,
  Scenario,
} from 'stucumber/dist/parser';

export default class Transformer {
  transformFile(code: string): string {
    return `
import { cucumber } from "stucumber/dist/cucumber";
import promiseFinally from 'promise.prototype.finally';
const _cucumber = cucumber.clone();

export default async function Features(obj) {
  ${code}
}
    `;
  }

  transformFeature(f: Feature, rd: RuleDeclaration[], s: Scenario[]): string {
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

  transformRuleDeclaration(r: RuleDeclaration): string {
    const name = JSON.stringify(r.template.value);
    const rulesStr = r.rules
      .map((rule) => this.transformRule(rule, true))
      .join('');
    return `_cucumber.defineRule(${name}, (world, params) => Promise.resolve()
          ${rulesStr})`;
  }

  getScenarioName(s: Scenario) {
    return s.name.value;
  }

  private getContext(name: string, annotations: Annotation[], rules?: Rule[]) {
    const context: any = { name, annotations, meta: {} };
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

  transformScenario(scenario: Scenario): string {
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

  transformRule(rule: Rule, isTemplate?: boolean): string {
    const name = JSON.stringify(rule.value);
    const data = rule.data?.length ? JSON.stringify(rule.data) : 'null';
    const template = isTemplate ? ', params' : '""';
    return `.then(() => { 
          _cucumber.rule(world, ${name}, ${data}, ${template}) 
        })`;
  }

  getFeatureName(feature: Feature) {
    return 'Feature: ' + feature.name.value;
  }

  transform(source: string) {
    const feature = parse(source);
    const background = feature.background || [];
    const ds = feature.ruleDeclarations || [];
    const scenarios = feature.scenarios.map((scenario) => {
      return { ...scenario, rules: [...background, ...scenario.rules] };
    });
    return this.transformFile(this.transformFeature(feature, ds, scenarios));
  }
}
