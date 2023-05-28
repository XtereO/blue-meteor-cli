import { TemplateTestOptions } from '../models/index.js';
import { TemplateTest } from '../template/index.js';
import { writeAndLintFile } from './writeAndLintFile.js';

export const writeTestFile = (
  pathToFileWithoutExtension: string,
  testOptions: TemplateTestOptions
) => {
  writeAndLintFile(
    `${pathToFileWithoutExtension}.test.ts`,
    TemplateTest(testOptions)
  );
};
