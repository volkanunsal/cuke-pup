import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
const jsonReports = process.cwd() + '/reports/json';

/**
 * createJsonReportsFolder
 *
 * @category TestUtil
 */
export function createJsonReportsFolder() {
  if (!fs.existsSync(jsonReports)) {
    mkdirp.sync(jsonReports);
  }
}
