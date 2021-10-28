declare module 'stucumber' {
  import { Annotation } from 'stucumber/dist/parser';
  import { ReportElement } from 'stucumber/dist/reporter';
  export interface TestContext {
    name: string;
    annotations: Annotation[];
    meta: {
      [key: string]: any;
    };
  }
  export interface FeatureContext extends TestContext {
    filename: string;
  }
  export interface ScenarioContext extends TestContext {
    feature: FeatureContext;
    steps: ScenarioContextStep[];
  }
  export interface ScenarioContextStep {
    name: string;
    line: string;
    keyword: string;
  }
  export interface RuleHandler {
    (world: any, ...args: any[]): any;
  }
  export interface FeatureHookHandler {
    (this: FeatureContext, world?: any): any;
  }
  export interface ScenarioHookHandler {
    (this: ScenarioContext, world?: any, annotations?: Annotation[]): any;
  }
  export declare type HookHandler = FeatureHookHandler | ScenarioHookHandler;
  export declare enum HookType {
    BeforeFeatures = 0,
    BeforeScenarios = 1,
    AfterFeatures = 2,
    AfterScenarios = 3,
  }
  export default class Cucumber {
    private rules;
    private hooks;
    private _createWorld;
    private reporter;
    constructor();
    defineRule(match: RegExp | string, handler: RuleHandler): any;
    addHook(
      type: HookType.BeforeFeatures | HookType.AfterFeatures,
      handler: FeatureHookHandler,
    ): any;
    addHook(
      type: HookType.BeforeScenarios | HookType.AfterScenarios,
      handler: ScenarioHookHandler,
    ): any;
    private runHook(type, world?, context?);
    enterFeature(feature: FeatureContext): Promise<any[]>;
    enterScenario(world: any, scenario: ScenarioContext): Promise<any[]>;
    exitFeature(feature: FeatureContext): Promise<any[]>;
    exitScenario(world: any, scenario: ScenarioContext): Promise<any[]>;
    private compileTemplate(match, handler);
    defineCreateWorld(_createWorld: () => any): void;
    rule(
      world: any,
      str: string,
      data?: string[][],
      params?: {
        [key: string]: any;
      },
    ): Promise<void>;
    createWorld(): any;
    clone(): Cucumber;
    getResults(): ReportElement[];
  }
  export declare const cucumber: Cucumber;
}
declare module 'stucumber/dist/parser' {
  export interface Feature {
    name: Clause;
    scenarios: Scenario[];
    annotations: Annotation[];
    background?: Rule[];
    ruleDeclarations?: RuleDeclaration[];
  }

  export interface Annotation {
    name: string;
    arguments?: any[];
  }

  export interface RuleDeclaration {
    template: Clause;
    rules: Rule[];
  }

  export interface Scenario {
    name: Clause;
    rules: Rule[];
    annotations: Annotation[];
  }

  export interface Rule extends Clause {
    keyword: string;
    data?: any;
  }

  export interface Clause {
    value: string;
    location: {
      line: number;
      column: number;
      offset: number;
    };
  }

  export function parse(source: string): Feature;
}
