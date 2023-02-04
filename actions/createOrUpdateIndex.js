import { existsSync, readFileSync, writeFileSync } from 'fs';
import { TemplateIndexCode } from '../code/index.js';
import { addImport, lint } from '../linter.js';

export const createOrUpdateIndex = (pathToIndex, name) => {
  if (!existsSync(pathToIndex)) {
    writeFileSync(pathToIndex, TemplateIndexCode(`./${name}`));
  } else {
    writeFileSync(
      pathToIndex,
      addImport(
        readFileSync(pathToIndex, { encoding: 'utf-8' }),
        { from: `./${name}`, what: '*' },
        false
      )
    );
  }
  lint(pathToIndex);
};
