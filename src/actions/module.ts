import { exec } from 'child_process';
import { removeFolder, writeAndLintFile } from '../file/index.js';
import { testMiddleware } from '../middlewares/index.js';
import { RemoveOption, TestOption } from '../models/index.js';
import {
  effectorIndexCode,
  effectsCode,
  eventsCode,
  storeCode,
} from '../template/index.js';
import { toCamelCase } from '../utils/index.js';

export const module = (
  name: string,
  options: Partial<RemoveOption & TestOption>
) => {
  const pathToFolder = `src/core/modules/${name}`;
  if (options?.remove) {
    removeFolder(pathToFolder);
    return;
  }

  exec(
    `mkdir src & cd src & mkdir core & cd core & mkdir modules & cd modules & mkdir ${name}`,
    () => {
      const nameCamelCase = toCamelCase(name);
      testMiddleware(!!options?.test, pathToFolder, {
        name: nameCamelCase,
        type: 'module',
      });
      const path = (n: string) => `src/core/modules/${name}/${n}`;
      writeAndLintFile(path('store.ts'), storeCode(nameCamelCase));
      writeAndLintFile(path('events.ts'), eventsCode());
      writeAndLintFile(path('effects.ts'), effectsCode());
      writeAndLintFile(path('index.ts'), effectorIndexCode());
    }
  );
};
