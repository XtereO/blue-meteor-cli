import { exec } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import {
  AppLayoutCode,
  TemplateIndexCode,
  TemplateLayoutCode,
} from '../code/index.js';
import { addComponent, addImport, rmComponent, rmImport } from '../linter.js';
import { capitalize } from '../util.js';
import { createCssFile } from './createCssFile.js';
import { createFile } from './createFile.js';
import { removeFolder, rmRoute } from './removeFolder.js';
import { route } from './route.js';

export const layout = (name, options) => {
  exec(
    `mkdir src & cd src & mkdir ui & cd ui & mkdir layouts & cd layouts & mkdir ${name} & cd ${name} & mkdir panels`,
    () => {
      const isRemoveOption = options.hasOwnProperty('remove') && options.remove;
      const isCssOption = options.hasOwnProperty('css') && options.css;
      const layoutName = capitalize(name);
      const componentName = `${layoutName}Layout`;
      const curPath = `src/ui/layouts/${name}`;
      if (isRemoveOption) {
        const pathToAppLayout = `src/ui/app-layout/AppLayout.tsx`;
        removeFolder(curPath);
        rmRoute('view', layoutName);
        if (existsSync(pathToAppLayout)) {
          createFile(
            pathToAppLayout,
            rmImport(
              rmComponent(
                readFileSync(pathToAppLayout, { encoding: 'utf-8' }),
                componentName,
                'Root'
              ),
              { from: `@ui/layouts/${name}`, what: `{${componentName}}` }
            )
          );
        }
        return;
      }
      if (isCssOption) {
        createCssFile(`${curPath}/${componentName}`);
      }
      createFile(
        `${curPath}/index.ts`,
        TemplateIndexCode(`./${componentName}`, '*')
      );
      createFile(
        `${curPath}/${componentName}.tsx`,
        TemplateLayoutCode(layoutName, isCssOption)
      );
      writeFileSync(`${curPath}/panels/index.ts`, '');

      exec(`cd src & cd ui & mkdir app-layout`, () => {
        const curPath = `src/ui/app-layout`;
        if (!existsSync(`${curPath}/index.tsx`)) {
          createFile(
            `${curPath}/index.ts`,
            TemplateIndexCode('./AppLayout', '*')
          );
        }
        if (!existsSync(`${curPath}/AppLayout.tsx`)) {
          createFile(
            `${curPath}/AppLayout.tsx`,
            AppLayoutCode(componentName, name)
          );
        } else {
          const appLayout = readFileSync(`${curPath}/AppLayout.tsx`, {
            encoding: 'utf-8',
          });
          createFile(
            `${curPath}/AppLayout.tsx`,
            addImport(
              addComponent(
                appLayout,
                `<${componentName} id={ViewRoute.${layoutName}} />`,
                'Root'
              ),
              { what: `{${componentName}}`, from: `@ui/layouts/${name}` }
            )
          );
        }
      });
      route('view', layoutName);
    }
  );
};
