import { writeTestFile } from '../file/index.js';
import { TemplateTestOptions } from '../models/index.js';

export const testMiddleware = (
  isTestOption: boolean,
  pathToFileFolder: string,
  { name, type }: TemplateTestOptions
) => {
  if (isTestOption) {
    writeTestFile(`${pathToFileFolder}/${name}`, {
      name: name,
      type: type,
    });
  }
};
