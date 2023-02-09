import { exec } from 'child_process';
import { existsSync, readFileSync, rmSync } from 'fs';
import { removeRoute } from '../linter.js';
import { capitalize } from '../util.js';
import { createFile } from './createFile.js';

export const removeFolder = (pathToFolder) => {
  rmSync(pathToFolder, { recursive: true, force: true });
};
export const rmRoute = (typeRoute, valueRoute) => {
  exec(
    `cd src & mkdir core & cd core & mkdir models & cd models & mkdir enums`,
    () => {
      const curPath = `src/core/models/enums`;
      if (!existsSync(`${curPath}/index.ts`)) {
        createFile(`${curPath}/index.ts`, "export * from './routes';");
      }
      if (!existsSync(`${curPath}/routes.ts`)) {
        createFile(`${curPath}/routes.ts`, routesCode({}));
      } else {
        createFile(
          `${curPath}/routes.ts`,
          removeRoute(
            readFileSync(`${curPath}/routes.ts`, { encoding: 'utf-8' }),
            capitalize(typeRoute),
            valueRoute
          )
        );
      }
    }
  );
};
