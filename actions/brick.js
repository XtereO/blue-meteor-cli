import { exec } from 'child_process';
import { writeFileSync } from 'fs';
import { TemplateComponentCode } from '../code/TemplateComponent.js';
import { TemplateIndexCode } from '../code/TemplateIndex.js';
import { lint } from '../linter.js';
import { capitalize } from '../util.js';
import { createOrUpdateIndex } from './createOrUpdateIndex.js';

const template = (isBrick) => (name) => {
  const folder = isBrick ? 'bricks' : 'atoms';
  exec(
    `mkdir src & cd src & mkdir ui & cd ui & mkdir bricks & cd ${folder} & mkdir ${name}`,
    () => {
      const nameUpperCase = capitalize(name);
      const pathToFolder = `src/ui/${folder}/${name}`;
      writeFileSync(
        `${pathToFolder}/${nameUpperCase}.tsx`,
        TemplateComponentCode(nameUpperCase)
      );
      writeFileSync(
        `${pathToFolder}/index.ts`,
        TemplateIndexCode(`./${nameUpperCase}`)
      );
      lint(`${pathToFolder}/${nameUpperCase}.tsx`, `${pathToFolder}/index.ts`);

      createOrUpdateIndex(`src/ui/${folder}/index.ts`, name);
    }
  );
};

export const brick = template(true);
export const atom = template(false);
