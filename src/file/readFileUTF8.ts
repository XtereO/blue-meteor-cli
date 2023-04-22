import { readFileSync } from 'fs';

export const readFileUTF8 = (pathToFile: string) => {
  return readFileSync(pathToFile, { encoding: 'utf-8' });
};
