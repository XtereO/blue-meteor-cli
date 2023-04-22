import { exec } from 'child_process';
import { existsSync } from 'fs';
import {
  readFileUTF8,
  removeFolder,
  writeAndLintFile,
  writeCssFile,
} from '../file/index.js';
import { BaseOptions } from '../models/index.js';
import {
  TemplateEmptyComponentCode,
  TemplateIndexCode,
  TemplatePopoutLayoutCode,
  TemplatePopoutLayoutCssCode,
} from '../template/index.js';
import {
  addImport,
  addPopoutProp,
  capitalize,
  removeImport,
  removePopoutProp,
} from '../utils/index.js';
import { addRoute, removeRoute } from './route.js';

export const popout = (name: string, options: BaseOptions) => {
  const isRemoveOption = options.hasOwnProperty('remove') && options.remove;
  const isCssOption = options.hasOwnProperty('css') && options.css;
  exec(
    `mkdir src & cd src & mkdir ui & cd ui & mkdir layouts & cd layouts & mkdir popout & cd popout & mkdir popouts & cd popouts & mkdir ${name}`,
    () => {
      const nameCapitalize = capitalize(name);
      const componentName = `${nameCapitalize}Popout`;
      const pathToPopouts = `src/ui/layouts/popout/popouts`;
      if (isRemoveOption) {
        const pathToLayout = `src/ui/layouts/popout/PopoutLayout.tsx`;
        removeFolder(`${pathToPopouts}/${name}`);
        removeRoute('popout', nameCapitalize);
        writeAndLintFile(
          `${pathToPopouts}/index.ts`,
          removeImport(readFileUTF8(`${pathToPopouts}/index.ts`), {
            from: `./${name}`,
            what: '*',
          })
        );
        if (existsSync(pathToLayout)) {
          writeAndLintFile(
            pathToLayout,
            removeImport(
              removePopoutProp(readFileUTF8(pathToLayout), nameCapitalize),
              { from: `./popouts`, what: `{${componentName}}` }
            )
          );
        }
        return;
      }
      if (isCssOption) {
        writeCssFile(`${pathToPopouts}/${name}/${componentName}`);
      }
      writeAndLintFile(
        `${pathToPopouts}/${name}/index.ts`,
        TemplateIndexCode(`./${componentName}`)
      );
      writeAndLintFile(
        `${pathToPopouts}/${name}/${componentName}.tsx`,
        TemplateEmptyComponentCode(componentName, !!isCssOption)
      );

      if (!existsSync(`${pathToPopouts}/index.ts`)) {
        writeAndLintFile(
          `${pathToPopouts}/index.ts`,
          TemplateIndexCode(`./${name}`, '*')
        );
      } else {
        writeAndLintFile(
          `${pathToPopouts}/index.ts`,
          addImport(
            readFileUTF8(`${pathToPopouts}/index.ts`),
            { from: `./${name}`, what: '*' },
            false
          )
        );
      }
      addRoute('popout', nameCapitalize);

      const pathToPopoutLayout = `src/ui/layouts/popout/PopoutLayout.tsx`;
      if (existsSync(pathToPopoutLayout)) {
        writeAndLintFile(
          pathToPopoutLayout,
          addImport(
            addPopoutProp(readFileUTF8(pathToPopoutLayout), nameCapitalize),
            { from: './popouts', what: `{${componentName}}` }
          )
        );
      } else {
        writeAndLintFile(
          pathToPopoutLayout,
          TemplatePopoutLayoutCode(nameCapitalize)
        );
        writeAndLintFile(
          pathToPopoutLayout.replace('PopoutLayout.tsx', 'index.ts'),
          TemplateIndexCode('./PopoutLayout')
        );
      }
      const pathToPopoutLayoutCss = `src/ui/layouts/popout/PopoutLayout.css.ts`;
      if (!existsSync(pathToPopoutLayoutCss)) {
        writeAndLintFile(pathToPopoutLayoutCss, TemplatePopoutLayoutCssCode());
      }
    }
  );
};
