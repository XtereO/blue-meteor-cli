import { exec } from 'child_process';
import {
  effectorIndexCode,
  effectsCode,
  eventsCode,
  storeCode,
} from '../code/index.js';
import { toCamelCase } from '../util.js';
import { createFile } from './createFile.js';

export const module = (name) => {
  exec(
    `mkdir src & cd src & mkdir core & cd core & mkdir modules & cd modules & mkdir ${name}`,
    () => {
      const nameCamelCase = toCamelCase(name);
      const path = (n) => `src/core/modules/${name}/${n}`;
      createFile(path('store.ts'), storeCode(nameCamelCase));
      createFile(path('events.ts'), eventsCode());
      createFile(path('effects.ts'), effectsCode());
      createFile(path('index.ts'), effectorIndexCode());
    }
  );
};
