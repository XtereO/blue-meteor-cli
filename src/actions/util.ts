import { exec } from 'child_process';
import { RemoveOption } from 'src/models/options.js';
import {
  removeExportIndex,
  removeFolder,
  writeAndLintFile,
  writeOrUpdateIndex,
} from '../file/index.js';
import {
  TemplateEmptyFunctionCode,
  TemplateIndexCode,
} from '../template/index.js';
import { toCamelCase } from '../utils/index.js';

export const template =
  (folder: string, prefix = '') =>
  (name: string, options: RemoveOption) => {
    const path = (p: string) => `src/core/${folder}/${p}`;
    if (options?.remove) {
      removeFolder(path(name));
      removeExportIndex(path('index.ts'), name);
      return;
    }

    exec(
      `mkdir src & cd src & mkdir core & cd core & mkdir ${folder} & cd ${folder} & mkdir ${name}`,
      () => {
        const nameCamelCase = toCamelCase(`${prefix}${name}`);
        writeAndLintFile(
          path(`${name}/${nameCamelCase}.ts`),
          TemplateEmptyFunctionCode(nameCamelCase)
        );
        writeAndLintFile(
          path(`${name}/index.ts`),
          TemplateIndexCode(`./${nameCamelCase}`)
        );

        writeOrUpdateIndex(path('index.ts'), name);
      }
    );
  };

export const util = template('utils');
export const hook = template('hooks', 'use-');
