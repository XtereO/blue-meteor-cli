import { exec } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import {
  ModalLayoutCode,
  TemplateCardCode,
  TemplateIndexCode,
  TemplateModalCode,
} from '../code/index.js';
import { addComponent, addImport, rmComponent, rmImport } from '../linter.js';
import { capitalize } from '../util.js';
import { createCssFile } from './createCssFile.js';
import { createFile } from './createFile.js';
import { createOrUpdateIndex } from './createOrUpdateIndex.js';
import { removeFolder, rmRoute } from './removeFolder.js';
import { route } from './route.js';

const template = (isModal) => (name, options) => {
  const upperCase = isModal ? 'Modal' : 'Card';
  const lowerCase = isModal ? 'modal' : 'card';
  const isRemoveOption = options.hasOwnProperty('remove') && options.remove;
  const isCssOption = options.hasOwnProperty('css') && options.css;
  const folder = `${lowerCase}s`;
  exec(
    `mkdir src & cd src & mkdir ui & cd ui & mkdir layouts & cd layouts & mkdir modal & cd modal & mkdir ${folder} & cd ${folder} & mkdir ${name}`,
    () => {
      const nameModalCapitalize = capitalize(name);
      const componentModal = `${nameModalCapitalize}${upperCase}`;
      const pathToModals = `src/ui/layouts/modal/${folder}`;
      if (isRemoveOption) {
        const pathToLayout = `src/ui/layouts/modal/ModalLayout.tsx`;
        removeFolder(`${pathToModals}/${name}`);
        rmRoute('modal', nameModalCapitalize);
        createFile(
          `${pathToModals}/index.ts`,
          rmImport(
            readFileSync(`${pathToModals}/index.ts`, { encoding: 'utf-8' }),
            { from: `./${name}`, what: '*' }
          )
        );
        if (existsSync(pathToLayout)) {
          createFile(
            pathToLayout,
            rmImport(
              rmComponent(
                readFileSync(pathToLayout, { encoding: 'utf-8' }),
                componentModal,
                'ModalRoot'
              ),
              { from: `./${folder}`, what: `{${componentModal}}` }
            )
          );
        }
        return;
      }
      if (isCssOption) {
        createCssFile(`${pathToModals}/${name}/${componentModal}`);
      }
      createFile(
        `${pathToModals}/${name}/${componentModal}.tsx`,
        isModal
          ? TemplateModalCode(nameModalCapitalize, isCssOption)
          : TemplateCardCode(nameModalCapitalize, isCssOption)
      );
      createFile(
        `${pathToModals}/${name}/index.ts`,
        TemplateIndexCode(`./${componentModal}`, '*')
      );

      createOrUpdateIndex(`${pathToModals}/index.ts`, name);

      const pathToLayout = `src/ui/layouts/modal/ModalLayout.tsx`;
      if (!existsSync(pathToLayout)) {
        createFile(pathToLayout, ModalLayoutCode(nameModalCapitalize, isModal));
      } else {
        createFile(
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
      route('modal', nameModalCapitalize);
    }
  );
};

export const modal = template(true);
export const card = template(false);
