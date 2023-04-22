import { exec } from 'child_process';

export const lint = (...pathFileNames: string[]) => {
  pathFileNames.forEach((p) =>
    exec(`npx prettier --write ${p}`, () => {
      console.log(`formated file ${p}`);
    })
  );
};
