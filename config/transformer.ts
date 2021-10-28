import {
  Feature,
  parse,
  Rule,
  RuleDeclaration,
  Scenario,
} from 'stucumber/dist/parser';

export default class Transformer<T> {
  transformFeature(feature: Feature, ruleDeclarations: T[], scenarios: T[]): T {
    return 'TODO:..';
  }

  transformRuleDeclaration(
    feature: Feature,
    ruleDeclaration: RuleDeclaration,
    rules: T[],
  ): T {
    return 'TODO:..';
  }

  transformScenario(feature: Feature, scenario: Scenario, rules: T[]): T {
    return 'TODO:..';
  }

  transformRule(
    feature: Feature,
    scenario: Scenario,
    rule: Rule,
    template?: boolean,
  ): T {
    return 'TODO:..';
  }

  transformFile(file: T): string {
    return 'TODO:...';
  }

  transform(source: string) {
    const feature = parse(source);
    const background = feature.background || [];

    return this.transformFile(
      this.transformFeature(
        feature,
        feature.ruleDeclarations
          ? feature.ruleDeclarations.map((ruleDeclaration) =>
              this.transformRuleDeclaration(
                feature,
                ruleDeclaration,
                ruleDeclaration.rules.map((rule) =>
                  this.transformRule(feature, null, rule, true),
                ),
              ),
            )
          : [],
        feature.scenarios.map((scenario) =>
          this.transformScenario(
            feature,
            scenario,
            [...background, ...scenario.rules].map((rule) =>
              this.transformRule(feature, scenario, rule),
            ),
          ),
        ),
      ),
    );
  }
}
