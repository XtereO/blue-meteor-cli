import { exec } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import {
  PopoutLayoutCode,
  PopoutLayoutCssCode,
  TemplateEmptyComponentCode,
  TemplateIndexCode,
} from '../code/index.js';
import { addImport, addPopout, lint } from '../linter.js';
import { capitalize } from '../util.js';
import { route } from './route.js';

export const popout = (name) => {
  exec(
    `mkdir src & cd src & mkdir ui & cd ui & mkdir layouts & cd layouts & mkdir popout & cd popout & mkdir popouts & cd popouts & mkdir ${name}`,
    () => {
      const nameCapitalize = capitalize(name);
      const componentName = `${nameCapitalize}Popout`;
      const pathToPopouts = `src/ui/layouts/popout/popouts`;
      writeFileSync(
        `${pathToPopouts}/${name}/index.ts`,
        TemplateIndexCode(`./${componentName}`)
      );
      writeFileSync(
        `${pathToPopouts}/${name}/${componentName}.tsx`,
        TemplateEmptyComponentCode(componentName)
      );
      lint(
        `${pathToPopouts}/${name}/index.ts`,
        `${pathToPopouts}/${name}/${componentName}.tsx`
      );

      if (!existsSync(`${pathToPopouts}/index.ts`)) {
        writeFileSync(
          `${pathToPopouts}/index.ts`,
          TemplateIndexCode(`./${name}`, '*')
        );
      } else {
        writeFileSync(
          `${pathToPopouts}/index.ts`,
          addImport(
            readFileSync(`${pathToPopouts}/index.ts`, { encoding: 'utf-8' }),
            { from: `./${name}`, what: '*' },
            false
          )
        );
      }
      lint(`${pathToPopouts}/index.ts`);

      route('popout', nameCapitalize);

      const pathToPopoutLayout = `src/ui/layouts/popout/PopoutLayout.tsx`;
      if (existsSync(pathToPopoutLayout)) {
        writeFileSync(
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
        writeFileSync(pathToPopoutLayout, PopoutLayoutCode(nameCapitalize));
      }
      const pathToPopoutLayoutCss = `src/ui/layouts/popout/PopoutLayout.css.ts`;
      if (!existsSync(pathToPopoutLayoutCss)) {
        writeFileSync(pathToPopoutLayoutCss, PopoutLayoutCssCode());
        lint(pathToPopoutLayoutCss);
      }

      lint(pathToPopoutLayout);
    }
  );
};
