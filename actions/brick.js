import { exec } from 'child_process';
import { readFileSync } from 'fs';
import { TemplateComponentCode } from '../code/TemplateComponent.js';
import { TemplateIndexCode } from '../code/TemplateIndex.js';
import { rmImport } from '../linter.js';
import { capitalize } from '../util.js';
import { createCssFile } from './createCssFile.js';
import { createFile } from './createFile.js';
import { createOrUpdateIndex } from './createOrUpdateIndex.js';
import { removeFolder } from './removeFolder.js';

const template = (isBrick) => (name, options) => {
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
        createFile(
          pathToRoot,
          rmImport(readFileSync(pathToRoot, { encoding: 'utf-8' }), {
            from: `./${name}`,
            what: '*',
          })
        );
        return;
      }
      if (isCssOption) {
        createCssFile(`${pathToFolder}/${nameUpperCase}`);
      }
      createFile(
        `${pathToFolder}/${nameUpperCase}.tsx`,
        TemplateComponentCode(nameUpperCase, isCssOption)
      );
      createFile(
        `${pathToFolder}/index.ts`,
        TemplateIndexCode(`./${nameUpperCase}`)
      );

      createOrUpdateIndex(`src/ui/${folder}/index.ts`, name);
    }
  );
};

export const brick = template(true);
export const atom = template(false);
