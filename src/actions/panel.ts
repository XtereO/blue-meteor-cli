import chalk from 'chalk';
import { exec } from 'child_process';
import { existsSync } from 'fs';
import {
  readFileUTF8,
  removeFolder,
  writeAndLintFile,
  writeCssFile,
} from '../file/index.js';
import { BaseOptions } from '../models/index.js';
import { TemplatePanelCode } from '../template/index.js';
import {
  addComponent,
  addImport,
  capitalize,
  removeComponent,
  removeImport,
} from '../utils/index.js';
import { addRoute, removeRoute } from './route.js';

export const panel = (
  panelName: string,
  layoutName: string,
  options: BaseOptions
) => {
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
        writeAndLintFile(
          `${curPath}/panels/index.ts`,
          removeImport(readFileUTF8(`${curPath}/panels/index.ts`), {
            from: `./${panelName}`,
            what: '*',
          })
        );
        removeRoute('panel', panelNameCapitalize);
        if (existsSync(pathToLayout)) {
          writeAndLintFile(
            pathToLayout,
            removeImport(
              removeComponent(
                readFileUTF8(pathToLayout),
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
        writeCssFile(`${curPath}/panels/${panelName}/${panelComponet}`);
      }
      writeAndLintFile(
        `${curPath}/panels/${panelName}/${panelComponet}.tsx`,
        TemplatePanelCode(panelNameCapitalize, !!isCssOption)
      );
      writeAndLintFile(
        `${curPath}/panels/${panelName}/index.ts`,
        `export * from './${panelComponet}';`
      );
      if (!existsSync(`${curPath}/panels/index.ts`)) {
        writeAndLintFile(
          `${curPath}/panels/index.ts`,
          `export * from './${panelName}';`
        );
      } else {
        writeAndLintFile(
          `${curPath}/panels/index.ts`,
          addImport(
            readFileUTF8(`${curPath}/panels/index.ts`),
            { from: `./${panelName}`, what: '*' },
            false
          )
        );
      }

      writeAndLintFile(
        `${curPath}/${layoutComponent}.tsx`,
        addImport(
          addComponent(
            readFileUTF8(`${curPath}/${layoutComponent}.tsx`),
            `<${panelComponet} id={PanelRoute.${panelNameCapitalize}} />`,
            'CustomLayout'
          ),
          { what: `{${panelComponet}}`, from: `./panels` }
        )
      );

      addRoute('panel', panelNameCapitalize);
    }
  );
};
