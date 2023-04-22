import { rmSync } from 'fs';

export const removeFolder = (pathToFolder: string) => {
  rmSync(pathToFolder, { recursive: true, force: true });
};
