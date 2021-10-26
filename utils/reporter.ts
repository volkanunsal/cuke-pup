import * as reporter from 'cucumber-html-reporter';
import * as path from 'path';
import { createJsonReportsFolder } from './createJsonReportsFolder';

createJsonReportsFolder();

const jsonReports = path.join(process.cwd(), '/reports/json');
const htmlReports = path.join(process.cwd(), '/reports/html');
const targetJson = jsonReports + '/cucumber_report.json';

const cucumberReporterOptions = {
  jsonFile: targetJson,
  output: htmlReports + '/cucumber_reporter.html',
  reportSuiteAsScenarios: true,
  theme: 'bootstrap',
};

try {
  reporter.generate(cucumberReporterOptions);
} catch (err) {
  if (err) {
    throw new Error('Failed to save cucumber test results to json file.');
  }
}
