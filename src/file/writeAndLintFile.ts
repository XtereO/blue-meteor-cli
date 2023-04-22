import { writeFileSync } from 'fs';
import { lint } from './lint.js';

export const writeAndLintFile = (pathToFile: string, code: string) => {
  writeFileSync(pathToFile, code);
  lint(pathToFile);
};
