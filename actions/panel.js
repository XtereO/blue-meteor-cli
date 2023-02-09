import chalk from 'chalk';
import { exec } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { TemplatePanelCode } from '../code/index.js';
import {
  addComponent,
  addImport,
  lint,
  rmComponent,
  rmImport,
} from '../linter.js';
import { capitalize } from '../util.js';
import { createCssFile } from './createCssFile.js';
import { createFile } from './createFile.js';
import { removeFolder, rmRoute } from './removeFolder.js';
import { route } from './route.js';

export const panel = (panelName, layoutName, options) => {
  const isRemoveOption = options.hasOwnProperty('remove') && options.remove;
  const isCssOption = options.hasOwnProperty('css') && options.css;
  const layoutNameCapitalize = capitalize(layoutName);
  const layoutComponent = `${layoutNameCapitalize}Layout`;
  const panelNameCapitalize = capitalize(panelName);
  const panelComponet = `${panelNameCapitalize}Panel`;
  if (!existsSync(`src/ui/layouts/${layoutName}/${layoutComponent}.tsx`)) {
    console.log(
      chalk.red(
        `Layout ${layoutName} doesn't exist. Create first, than repeat operation.`
      )
    );
    return;
  }
  exec(
    `cd src/ui/layouts/${layoutName} & mkdir panels & cd panels & mkdir ${panelName}`,
    () => {
      const curPath = `src/ui/layouts/${layoutName}`;
      if (isRemoveOption) {
        const pathToLayout = `src/ui/layouts/${layoutName}/${layoutComponent}.tsx`;
        removeFolder(`${curPath}/panels/${panelName}`);
        createFile(
          `${curPath}/panels/index.ts`,
          rmImport(
            readFileSync(`${curPath}/panels/index.ts`, { encoding: 'utf-8' }),
            { from: `./${panelName}`, what: '*' }
          )
        );
        rmRoute('panel', panelNameCapitalize);
        if (existsSync(pathToLayout)) {
          createFile(
            pathToLayout,
            rmImport(
              rmComponent(
                readFileSync(pathToLayout, { encoding: 'utf-8' }),
                panelComponet,
                'CustomLayout'
              ),
              { from: `./panels`, what: `{${panelComponet}}` }
            )
          );
        }
        return;
      }
      if (isCssOption) {
        createCssFile(`${curPath}/panels/${panelName}/${panelComponet}`);
      }
      writeFileSync(
        `${curPath}/panels/${panelName}/${panelComponet}.tsx`,
        TemplatePanelCode(panelNameCapitalize, isCssOption)
      );
      writeFileSync(
        `${curPath}/panels/${panelName}/index.ts`,
        `export * from './${panelComponet}';`
      );
      if (!existsSync(`${curPath}/panels/index.ts`)) {
        writeFileSync(
          `${curPath}/panels/index.ts`,
          `export * from './${panelName}';`
        );
      } else {
        writeFileSync(
          `${curPath}/panels/index.ts`,
          addImport(
            readFileSync(`${curPath}/panels/index.ts`, { encoding: 'utf-8' }),
            { from: `./${panelName}`, what: '*' },
            false
          )
        );
      }
      lint(`${curPath}/panels/${panelName}/index.ts`);
      lint(`${curPath}/panels/index.ts`);
      lint(`${curPath}/panels/${panelName}/${panelComponet}.tsx`);

      writeFileSync(
        `${curPath}/${layoutComponent}.tsx`,
        addImport(
          addComponent(
            readFileSync(`${curPath}/${layoutComponent}.tsx`, {
              encoding: 'utf-8',
            }),
            `<${panelComponet} id={PanelRoute.${panelNameCapitalize}} />`,
            'CustomLayout'
          ),
          { what: `{${panelComponet}}`, from: `./panels` }
        )
      );
      lint(`${curPath}/${layoutComponent}.tsx`);

      route('panel', panelNameCapitalize);
    }
  );
};
