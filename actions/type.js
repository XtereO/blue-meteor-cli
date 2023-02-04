import { exec } from 'child_process';
import { enumCode, typeCode } from '../code/index.js';
import { toCamelCase } from '../util.js';
import { createFile } from './createFile.js';
import { createOrUpdateIndex } from './createOrUpdateIndex.js';

const template = (isType) => (name) => {
  const folder = isType ? 'types' : 'enums';
  const templateCode = isType ? typeCode(name) : enumCode(name);
  exec(
    `mkdir src & cd src & mkdir core & cd core & mkdir models & cd models & mkdir ${folder} & cd ${folder}`,
    () => {
      const path = (p) => `src/core/models/${folder}/${p}`;
      const nameCamelCase = toCamelCase(name);

      createFile(path(`${nameCamelCase}.ts`), templateCode);
      createOrUpdateIndex(path('index.ts'), nameCamelCase);
    }
  );
};

export const enumAction = template(false);
export const typeAction = template(true);
