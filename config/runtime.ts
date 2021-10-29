import { cucumber, HookType } from 'stucumber/dist/cucumber';

function step(pattern: RegExp | string, code: StepDefinitionCode) {
  cucumber.defineRule(pattern as string, (world, ...args) => {
    code.apply(world, args);
  });
}

export const Given = (pattern: RegExp | string, code: StepDefinitionCode) => {
  step(pattern, code);
};

export const Then = function (
  pattern: RegExp | string,
  code: StepDefinitionCode,
) {
  step(pattern, code);
};

export const After: GlobalHookCode = (code) => {
  cucumber.addHook(HookType.AfterScenarios, (w, annotations) => {
    code.apply(w, annotations);
  });
};
export const BeforeAll: GlobalHookCode = (code) => {
  cucumber.addHook(HookType.BeforeFeatures, code);
};
export const AfterAll: GlobalHookCode = (code) => {
  cucumber.addHook(HookType.AfterFeatures, code);
};
export const Before: GlobalHookCode = (code) => {
  cucumber.addHook(HookType.BeforeScenarios, (w, annotations) => {
    code.apply(w, annotations);
  });
};

// ---------------------------------------------------------------------------
// NOTE: Importing the types files from cucumber causes a lof of junk to be imported as well.
// That's why we're re-defining the types below.
// ---------------------------------------------------------------------------

export interface World {
  [key: string]: any;
}
export enum Status {
  AMBIGUOUS = 'ambiguous',
  FAILED = 'failed',
  PASSED = 'passed',
  PENDING = 'pending',
  SKIPPED = 'skipped',
  UNDEFINED = 'undefined',
}
export interface SourceLocation {
  line: number;
  uri: string;
}

export interface ScenarioResult {
  duration: number;
  status: Status;
}

export interface HookScenarioResult {
  sourceLocation: SourceLocation;
  result: ScenarioResult;
  pickle: pickle.Pickle;
}

export namespace pickle {
  export interface Pickle {
    language: string;
    locations: Location[];
    name: string;
    steps: Step[];
    tags: Tag[];
  }

  interface Location {
    column: number;
    line: number;
  }

  interface Step {
    arguments: Argument[];
    locations: Location[];
    text: string;
  }

  interface Argument {
    rows: Cell[];
  }

  interface Cell {
    location: Location;
    value: string;
  }

  interface Tag {
    name: string;
    location: Location;
  }
}

export interface StepDefinitionOptions {
  timeout?: number;
  wrapperOptions?: { [key: string]: any };
}

export type StepDefinitionCode = (this: World, ...stepArgs: any[]) => any;

export interface CallbackStepDefinition {
  pending(): PromiseLike<any>;
  (error?: any, pending?: string): void;
}

export type GlobalHookCode = (callback?: CallbackStepDefinition) => void;

export interface StepDefinitions {
  Given(
    pattern: RegExp | string,
    options: StepDefinitionOptions,
    code: StepDefinitionCode,
  ): void;
  Given(pattern: RegExp | string, code: StepDefinitionCode): void;
  When(
    pattern: RegExp | string,
    options: StepDefinitionOptions,
    code: StepDefinitionCode,
  ): void;
  When(pattern: RegExp | string, code: StepDefinitionCode): void;
  Then(
    pattern: RegExp | string,
    options: StepDefinitionOptions,
    code: StepDefinitionCode,
  ): void;
  Then(pattern: RegExp | string, code: StepDefinitionCode): void;
  setDefaultTimeout(time: number): void;
}
