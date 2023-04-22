import { exec } from 'child_process';
import { RemoveOption } from 'src/models/index.js';
import {
  removeExportIndex,
  removeFolder,
  writeAndLintFile,
  writeOrUpdateIndex,
} from '../file/index.js';
import { TemplateEnumCode, TemplateTypeCode } from '../template/index.js';
import { toCamelCase } from '../utils/index.js';

const template = (isType: boolean) => (name: string, options: RemoveOption) => {
  const folder = isType ? 'types' : 'enums';
  const templateCode = isType ? TemplateTypeCode(name) : TemplateEnumCode(name);
  const nameCamelCase = toCamelCase(name);
  const path = (p: string) => `src/core/models/${folder}/${p}`;
  if (options?.remove) {
    removeFolder(path(`${nameCamelCase}.ts`));
    removeExportIndex(path('index.ts'), nameCamelCase);
    return;
  }

  exec(
    `mkdir src & cd src & mkdir core & cd core & mkdir models & cd models & mkdir ${folder} & cd ${folder}`,
    () => {
      writeAndLintFile(path(`${nameCamelCase}.ts`), templateCode);
      writeOrUpdateIndex(path('index.ts'), nameCamelCase);
    }
  );
};

export const enumAction = template(false);
export const typeAction = template(true);
