import { exec } from 'child_process';
import { emptyFunctionCode } from '../code/emptyFunction.js';
import { TemplateIndexCode } from '../code/TemplateIndex.js';
import { toCamelCase } from '../util.js';
import { createFile } from './createFile.js';
import { createOrUpdateIndex } from './createOrUpdateIndex.js';

export const template =
  (folder, prefix = '') =>
  (name) => {
    exec(
      `mkdir src & cd src & mkdir core & cd core & mkdir ${folder} & cd ${folder} & mkdir ${name}`,
      () => {
        const nameCamelCase = toCamelCase(`${prefix}${name}`);
        const path = (p) => `src/core/${folder}/${p}`;
        createFile(
          path(`${name}/${nameCamelCase}.ts`),
          emptyFunctionCode(nameCamelCase)
        );
        createFile(
          path(`${name}/index.ts`),
          TemplateIndexCode(`./${nameCamelCase}`)
        );

        createOrUpdateIndex(path('index.ts'), name);
      }
    );
  };

export const util = template('utils');
export const hook = template('hooks', 'use-');
