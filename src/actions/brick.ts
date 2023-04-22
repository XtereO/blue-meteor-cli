import { exec } from 'child_process';
import {
  readFileUTF8,
  removeFolder,
  writeAndLintFile,
  writeCssFile,
  writeOrUpdateIndex,
} from '../file/index.js';
import { BaseOptions } from '../models/index.js';
import { TemplateComponentCode } from '../template/index.js';
import { capitalize, removeImport } from '../utils/index.js';

const template = (isBrick: boolean) => (name: string, options: BaseOptions) => {
  const folder = isBrick ? 'bricks' : 'atoms';
  const isRemoveOption = options.hasOwnProperty('remove') && options.remove;
  const isCssOption = options.hasOwnProperty('css') && options.css;
  exec(
    `mkdir src & cd src & mkdir ui & cd ui & mkdir bricks & cd ${folder} & mkdir ${name}`,
    () => {
      const nameUpperCase = capitalize(name);
      const pathToFolder = `src/ui/${folder}/${name}`;

      if (isRemoveOption) {
        const pathToRoot = `src/ui/${folder}/index.ts`;
        removeFolder(pathToFolder);
        writeAndLintFile(
          pathToRoot,
          removeImport(readFileUTF8(pathToRoot), {
            from: `./${name}`,
            what: '*',
          })
        );
        return;
      }

      if (isCssOption) {
        writeCssFile(`${pathToFolder}/${nameUpperCase}`);
      }
      writeAndLintFile(
        `${pathToFolder}/${nameUpperCase}.tsx`,
        TemplateComponentCode(nameUpperCase, !!isCssOption)
      );
      writeOrUpdateIndex(`${pathToFolder}/index.ts`, nameUpperCase);
      writeOrUpdateIndex(`src/ui/${folder}/index.ts`, name);
    }
  );
};

export const brick = template(true);
export const atom = template(false);
