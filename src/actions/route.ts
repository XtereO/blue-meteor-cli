import { exec } from 'child_process';
import { existsSync } from 'fs';
import { readFileUTF8, writeAndLintFile } from '../file/index.js';
import { RouteKeys } from '../models/index.js';
import { TemplateRoutesCode } from '../template/index.js';
import { addRouteProp, removeRouteProp } from '../utils/index.js';

export const addRoute = (typeRoute: RouteKeys, valueRoute: string) => {
  exec(
    `cd src & mkdir core & cd core & mkdir models & cd models & mkdir enums`,
    () => {
      const curPath = `src/core/models/enums`;
      if (!existsSync(`${curPath}/index.ts`)) {
        writeAndLintFile(`${curPath}/index.ts`, "export * from './routes';");
      }
      if (!existsSync(`${curPath}/routes.ts`)) {
        writeAndLintFile(
          `${curPath}/routes.ts`,
          TemplateRoutesCode({ [typeRoute]: valueRoute })
        );
      } else {
        writeAndLintFile(
          `${curPath}/routes.ts`,
          addRouteProp(
            readFileUTF8(`${curPath}/routes.ts`),
            typeRoute,
            valueRoute
          )
        );
      }
    }
  );
};

export const removeRoute = (typeRoute: RouteKeys, valueRoute: string) => {
  exec(
    `cd src & mkdir core & cd core & mkdir models & cd models & mkdir enums`,
    () => {
      const curPath = `src/core/models/enums`;
      if (!existsSync(`${curPath}/index.ts`)) {
        writeAndLintFile(`${curPath}/index.ts`, "export * from './routes';");
      }
      if (!existsSync(`${curPath}/routes.ts`)) {
        writeAndLintFile(`${curPath}/routes.ts`, TemplateRoutesCode({}));
      } else {
        writeAndLintFile(
          `${curPath}/routes.ts`,
          removeRouteProp(
            readFileUTF8(`${curPath}/routes.ts`),
            typeRoute,
            valueRoute
          )
        );
      }
    }
  );
};
