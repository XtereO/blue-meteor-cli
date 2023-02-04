import { exec } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { AppLayoutCode, TemplateLayoutCode } from '../code/index.js';
import { addComponent, addImport, lint } from '../linter.js';
import { capitalize } from '../util.js';
import { route } from './route.js';

export const layout = (name) => {
  exec(
    `mkdir src & cd src & mkdir ui & cd ui & mkdir layouts & cd layouts & mkdir ${name} & cd ${name} & mkdir panels`,
    () => {
      const layoutName = capitalize(name);
      const componentName = `${layoutName}Layout`;
      const curPath = `src/ui/layouts/${name}`;
      writeFileSync(
        `${curPath}/index.ts`,
        `export * from "./${componentName}";`
      );
      writeFileSync(
        `${curPath}/${componentName}.tsx`,
        TemplateLayoutCode(layoutName)
      );
      lint(`${curPath}/${componentName}.tsx`);
      writeFileSync(`${curPath}/panels/index.ts`, '');

      exec(`cd src & cd ui & mkdir app-layout`, () => {
        const curPath = `src/ui/app-layout`;
        if (!existsSync(`${curPath}/index.tsx`)) {
          writeFileSync(
            `${curPath}/index.ts`,
            `export * from "./AppLayout.tsx";`
          );
        }
        if (!existsSync(`${curPath}/AppLayout.tsx`)) {
          writeFileSync(
            `${curPath}/AppLayout.tsx`,
            AppLayoutCode(componentName, name)
          );
        } else {
          const appLayout = readFileSync(`${curPath}/AppLayout.tsx`, {
            encoding: 'utf-8',
          });
          writeFileSync(
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
        lint(`${curPath}/AppLayout.tsx`);
      });
      route('view', layoutName);
    }
  );
};
