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
  AppLayoutCode,
  TemplateIndexCode,
  TemplateLayoutCode,
} from '../template/index.js';
import {
  addComponent,
  addImport,
  capitalize,
  removeComponent,
  removeImport,
} from '../utils/index.js';
import { addRoute, removeRoute } from './route.js';

export const layout = (name: string, options: BaseOptions) => {
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
        removeRoute('view', layoutName);
        if (existsSync(pathToAppLayout)) {
          writeAndLintFile(
            pathToAppLayout,
            removeImport(
              removeComponent(
                readFileUTF8(pathToAppLayout),
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
        writeCssFile(`${curPath}/${componentName}`);
      }
      writeAndLintFile(
        `${curPath}/index.ts`,
        TemplateIndexCode(`./${componentName}`, '*')
      );
      writeAndLintFile(
        `${curPath}/${componentName}.tsx`,
        TemplateLayoutCode(layoutName, !!isCssOption)
      );
      writeAndLintFile(`${curPath}/panels/index.ts`, '');

      exec(`cd src & cd ui & mkdir app-layout`, () => {
        const curPath = `src/ui/app-layout`;
        if (!existsSync(`${curPath}/index.tsx`)) {
          writeAndLintFile(
            `${curPath}/index.ts`,
            TemplateIndexCode('./AppLayout', '*')
          );
        }
        if (!existsSync(`${curPath}/AppLayout.tsx`)) {
          writeAndLintFile(
            `${curPath}/AppLayout.tsx`,
            AppLayoutCode(componentName, name)
          );
        } else {
          const appLayout = readFileUTF8(`${curPath}/AppLayout.tsx`);
          writeAndLintFile(
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
      addRoute('view', layoutName);
    }
  );
};
