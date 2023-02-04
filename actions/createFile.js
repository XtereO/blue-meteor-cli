import { writeFileSync } from 'fs';
import { lint } from '../linter.js';

export const createFile = (pathToFile, code) => {
  writeFileSync(pathToFile, code);
  lint(pathToFile);
};
