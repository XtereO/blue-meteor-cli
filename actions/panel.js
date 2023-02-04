import chalk from 'chalk';
import { exec } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { TemplatePanelCode } from '../code/index.js';
import { addComponent, addImport, lint } from '../linter.js';
import { capitalize } from '../util.js';
import { route } from './route.js';

export const panel = (panelName, layoutName) => {
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
      writeFileSync(
        `${curPath}/panels/${panelName}/${panelComponet}.tsx`,
        TemplatePanelCode(panelNameCapitalize)
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
