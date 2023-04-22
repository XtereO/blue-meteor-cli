import { TemplateCssCode } from '../template/index.js';
import { writeAndLintFile } from './writeAndLintFile.js';

export const writeCssFile = (pathToFileWithoutExtension: string) => {
  writeAndLintFile(`${pathToFileWithoutExtension}.css.ts`, TemplateCssCode());
};
