import { exec } from 'child_process';
import {
  removeExportIndex,
  removeFolder,
  writeAndLintFile,
  writeOrUpdateIndex,
} from '../file/index.js';
import { testMiddleware } from '../middlewares/index.js';
import { RemoveOption, TestOption } from '../models/index.js';
import {
  TemplateEmptyFunctionCode,
  TemplateIndexCode,
} from '../template/index.js';
import { toCamelCase } from '../utils/index.js';

export const template =
  (folder: string, prefix = '') =>
  (name: string, options: Partial<RemoveOption & TestOption>) => {
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
        testMiddleware(!!options?.test, path(name), {
          name: nameCamelCase,
          type: folder.slice(0, -1) as 'hook' | 'util',
        });
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
