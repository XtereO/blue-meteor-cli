import { TemplateCss } from '../code/index.js';
import { createFile } from './createFile.js';

export const createCssFile = (pathToFileWithoutExtension) => {
  createFile(`${pathToFileWithoutExtension}.css.ts`, TemplateCss());
};
