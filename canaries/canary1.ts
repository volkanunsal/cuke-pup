// import { exec } from "child_process";
import { Given } from '@cucumber';
function runFeatures(arr: string[]) {
  Given('foo', () => {});
  // TODO use Cucumber commandline API to load and run feature files from the named directory.
  // TODO: handle the errors and log them but do not throw them again.
  // exec('cucumber ')
  // cucumber-js --retry 3 ./features/*.feature --require-module ts-node/register --require './src/*/*.ts' --format 'json'
}

export default () => runFeatures(['cucumber']);
