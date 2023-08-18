import { TemplateTestOptions } from '../models/index.js';
import { TemplateModuleTest, TemplateTest } from '../template/index.js';
import { writeAndLintFile } from './writeAndLintFile.js';

export const writeTestFile = (
  pathToFileWithoutExtension: string,
  testOptions: TemplateTestOptions
) => {
  let template: string;
  switch (testOptions.type) {
    case 'module':
      template = TemplateModuleTest(testOptions.name);
      break;
    default:
      template = TemplateTest(testOptions);
  }

  writeAndLintFile(
    `${pathToFileWithoutExtension}.${testOptions.type}.test.ts`,
    template
  );
};
