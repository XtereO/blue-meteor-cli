import { existsSync } from 'fs';
import { TemplateIndexCode } from '../template/index.js';
import { addImport, removeImport } from '../utils/index.js';
import { readFileUTF8 } from './readFileUTF8.js';
import { writeAndLintFile } from './writeAndLintFile.js';

export const writeOrUpdateIndex = (pathToIndex: string, fromName: string) => {
  if (!existsSync(pathToIndex)) {
    writeAndLintFile(pathToIndex, TemplateIndexCode(`./${fromName}`));
  } else {
    writeAndLintFile(
      pathToIndex,
      addImport(
        readFileUTF8(pathToIndex),
        { from: `./${fromName}`, what: '*' },
        false
      )
    );
  }
};
export const removeExportIndex = (pathToIndex: string, fromName: string) => {
  if (!existsSync(pathToIndex)) {
    return;
  } else {
    writeAndLintFile(
      pathToIndex,
      removeImport(readFileUTF8(pathToIndex), {
        from: `./${fromName}`,
        what: '*',
      })
    );
  }
};
