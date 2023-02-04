import { exec } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import {
  ModalLayoutCode,
  TemplateCardCode,
  TemplateIndexCode,
  TemplateModalCode,
} from '../code/index.js';
import { addComponent, addImport, lint } from '../linter.js';
import { capitalize } from '../util.js';
import { createOrUpdateIndex } from './createOrUpdateIndex.js';
import { route } from './route.js';

const template = (isModal) => (name) => {
  const upperCase = isModal ? 'Modal' : 'Card';
  const lowerCase = isModal ? 'modal' : 'card';
  const folder = `${lowerCase}s`;
  exec(
    `mkdir src & cd src & mkdir ui & cd ui & mkdir layouts & cd layouts & mkdir modal & cd modal & mkdir ${folder} & cd ${folder} & mkdir ${name}`,
    () => {
      const nameModalCapitalize = capitalize(name);
      const componentModal = `${nameModalCapitalize}${upperCase}`;
      const pathToModals = `src/ui/layouts/modal/${folder}`;
      writeFileSync(
        `${pathToModals}/${name}/${componentModal}.tsx`,
        isModal
          ? TemplateModalCode(nameModalCapitalize)
          : TemplateCardCode(nameModalCapitalize)
      );
      writeFileSync(
        `${pathToModals}/${name}/index.ts`,
        TemplateIndexCode(`./${componentModal}`, '*')
      );
      lint(`${pathToModals}/${name}/${componentModal}.tsx`);
      lint(`${pathToModals}/${name}/index.ts`);

      createOrUpdateIndex(`${pathToModals}/index.ts`, name);
      lint(`${pathToModals}/index.ts`);

      const pathToLayout = `src/ui/layouts/modal/ModalLayout.tsx`;
      if (!existsSync(pathToLayout)) {
        writeFileSync(
          pathToLayout,
          ModalLayoutCode(nameModalCapitalize, isModal)
        );
      } else {
        writeFileSync(
          pathToLayout,
          addImport(
            addComponent(
              readFileSync(pathToLayout, { encoding: 'utf-8' }),
              `<${componentModal} id={ModalRoute.${nameModalCapitalize}} />`,
              'ModalRoot'
            ),
            { from: `./${folder}`, what: `{${componentModal}}` }
          )
        );
      }
      lint(pathToLayout);
      route('modal', nameModalCapitalize);
    }
  );
};

export const modal = template(true);
export const card = template(false);
