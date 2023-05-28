import { writeCssFile } from '../file/index.js';

export const cssMiddleware = (
  isCssOption: boolean,
  pathToFileFolder: string,
  filename: string
) => {
  if (isCssOption) {
    writeCssFile(`${pathToFileFolder}/${filename}`);
  }
};
