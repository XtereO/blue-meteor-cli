import { exec } from 'child_process';
import { existsSync } from 'fs';
import {
  readFileUTF8,
  removeFolder,
  writeAndLintFile,
  writeOrUpdateIndex,
} from '../file/index.js';
import { cssMiddleware, testMiddleware } from '../middlewares/index.js';
import { BaseOptions } from '../models/index.js';
import {
  TemplateCardCode,
  TemplateIndexCode,
  TemplateModalCode,
  TemplateModalLayoutCode,
} from '../template/index.js';
import {
  addComponent,
  addImport,
  capitalize,
  removeComponent,
  removeImport,
} from '../utils/index.js';
import { addRoute, removeRoute } from './route.js';

const template = (isModal: boolean) => (name: string, options: BaseOptions) => {
  const upperCase = isModal ? 'Modal' : 'Card';
  const lowerCase = isModal ? 'modal' : 'card';
  const isRemoveOption = options?.remove;
  const isCssOption = !!options?.css;
  const isTestOption = !!options?.test;
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
        removeRoute('modal', nameModalCapitalize);
        writeAndLintFile(
          `${pathToModals}/index.ts`,
          removeImport(readFileUTF8(`${pathToModals}/index.ts`), {
            from: `./${name}`,
            what: '*',
          })
        );
        if (existsSync(pathToLayout)) {
          writeAndLintFile(
            pathToLayout,
            removeImport(
              removeComponent(
                readFileUTF8(pathToLayout),
                componentModal,
                'ModalRoot'
              ),
              { from: `./${folder}`, what: `{${componentModal}}` }
            )
          );
        }
        return;
      }
      testMiddleware(isTestOption, `${pathToModals}/${name}`, {
        name: componentModal,
        type: 'component',
      });
      cssMiddleware(isCssOption, `${pathToModals}/${name}`, componentModal);
      writeAndLintFile(
        `${pathToModals}/${name}/${componentModal}.tsx`,
        isModal
          ? TemplateModalCode(nameModalCapitalize, !!isCssOption)
          : TemplateCardCode(nameModalCapitalize, !!isCssOption)
      );
      writeAndLintFile(
        `${pathToModals}/${name}/index.ts`,
        TemplateIndexCode(`./${componentModal}`, '*')
      );

      writeOrUpdateIndex(`${pathToModals}/index.ts`, name);

      const pathToLayout = (p?: string) =>
        `src/ui/layouts/modal/${p ?? 'ModalLayout.tsx'}`;
      if (!existsSync(pathToLayout())) {
        writeAndLintFile(
          pathToLayout(),
          TemplateModalLayoutCode(nameModalCapitalize, isModal)
        );
        writeAndLintFile(
          pathToLayout('index.ts'),
          TemplateIndexCode('./ModalLayout')
        );
      } else {
        writeAndLintFile(
          pathToLayout(),
          addImport(
            addComponent(
              readFileUTF8(pathToLayout()),
              `<${componentModal} id={ModalRoute.${nameModalCapitalize}} />`,
              'ModalRoot'
            ),
            { from: `./${folder}`, what: `{${componentModal}}` }
          )
        );
      }
      addRoute('modal', nameModalCapitalize);
    }
  );
};

export const modal = template(true);
export const card = template(false);
