import { exec } from 'child_process';
import { RemoveOption } from 'src/models/index.js';
import { removeFolder, writeAndLintFile } from '../file/index.js';
import {
  effectorIndexCode,
  effectsCode,
  eventsCode,
  storeCode,
} from '../template/index.js';
import { toCamelCase } from '../utils/index.js';

export const module = (name: string, options: RemoveOption) => {
  if (options?.remove) {
    removeFolder(`src/core/modules/${name}`);
    return;
  }

  exec(
    `mkdir src & cd src & mkdir core & cd core & mkdir modules & cd modules & mkdir ${name}`,
    () => {
      const nameCamelCase = toCamelCase(name);
      const path = (n: string) => `src/core/modules/${name}/${n}`;
      writeAndLintFile(path('store.ts'), storeCode(nameCamelCase));
      writeAndLintFile(path('events.ts'), eventsCode());
      writeAndLintFile(path('effects.ts'), effectsCode());
      writeAndLintFile(path('index.ts'), effectorIndexCode());
    }
  );
};