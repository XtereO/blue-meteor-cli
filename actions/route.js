import { exec } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { routesCode } from '../code/index.js';
import { addRoute, lint } from '../linter.js';
import { capitalize } from '../util.js';

export const route = (typeRoute, valueRoute) => {
  exec(
    `cd src & mkdir core & cd core & mkdir models & cd models & mkdir enums`,
    () => {
      const curPath = `src/core/models/enums`;
      if (!existsSync(`${curPath}/index.ts`)) {
        writeFileSync(`${curPath}/index.ts`, "export * from './routes';");
      }
      if (!existsSync(`${curPath}/routes.ts`)) {
        writeFileSync(
          `${curPath}/routes.ts`,
          routesCode({ [typeRoute]: valueRoute })
        );
      } else {
        writeFileSync(
          `${curPath}/routes.ts`,
          addRoute(
            readFileSync(`${curPath}/routes.ts`, { encoding: 'utf-8' }),
            capitalize(typeRoute),
            valueRoute
          )
        );
      }
      lint(`${curPath}/routes.ts`);
    }
  );
};
