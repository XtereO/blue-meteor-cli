import { exec } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import {
  PopoutLayoutCode,
  PopoutLayoutCssCode,
  TemplateEmptyComponentCode,
  TemplateIndexCode,
} from '../code/index.js';
import { addImport, addPopout, rmImport, rmPopout } from '../linter.js';
import { capitalize } from '../util.js';
import { createCssFile } from './createCssFile.js';
import { createFile } from './createFile.js';
import { removeFolder, rmRoute } from './removeFolder.js';
import { route } from './route.js';

export const popout = (name, options) => {
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
        rmRoute('popout', nameCapitalize);
        createFile(
          `${pathToPopouts}/index.ts`,
          rmImport(
            readFileSync(`${pathToPopouts}/index.ts`, { encoding: 'utf-8' }),
            { from: `./${name}`, what: '*' }
          )
        );
        if (existsSync(pathToLayout)) {
          createFile(
            pathToLayout,
            rmImport(
              rmPopout(
                readFileSync(pathToLayout, { encoding: 'utf-8' }),
                nameCapitalize
              ),
              { from: `./popouts`, what: `{${componentName}}` }
            )
          );
        }
        return;
      }
      if (isCssOption) {
        createCssFile(`${pathToPopouts}/${name}/${componentName}`);
      }
      createFile(
        `${pathToPopouts}/${name}/index.ts`,
        TemplateIndexCode(`./${componentName}`)
      );
      createFile(
        `${pathToPopouts}/${name}/${componentName}.tsx`,
        TemplateEmptyComponentCode(componentName, isCssOption)
      );

      if (!existsSync(`${pathToPopouts}/index.ts`)) {
        createFile(
          `${pathToPopouts}/index.ts`,
          TemplateIndexCode(`./${name}`, '*')
        );
      } else {
        createFile(
          `${pathToPopouts}/index.ts`,
          addImport(
            readFileSync(`${pathToPopouts}/index.ts`, { encoding: 'utf-8' }),
            { from: `./${name}`, what: '*' },
            false
          )
        );
      }
      route('popout', nameCapitalize);

      const pathToPopoutLayout = `src/ui/layouts/popout/PopoutLayout.tsx`;
      if (existsSync(pathToPopoutLayout)) {
        createFile(
          pathToPopoutLayout,
          addImport(
            addPopout(
              readFileSync(pathToPopoutLayout, { encoding: 'utf-8' }),
              nameCapitalize
            ),
            { from: './popouts', what: `{${componentName}}` }
          )
        );
      } else {
        createFile(pathToPopoutLayout, PopoutLayoutCode(nameCapitalize));
      }
      const pathToPopoutLayoutCss = `src/ui/layouts/popout/PopoutLayout.css.ts`;
      if (!existsSync(pathToPopoutLayoutCss)) {
        createFile(pathToPopoutLayoutCss, PopoutLayoutCssCode());
      }
    }
  );
};
