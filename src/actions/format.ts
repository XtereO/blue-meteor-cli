import { exec } from 'child_process';

export const format = () => {
  exec('npx prettier --write .', (err, stdout, stderr) => {
    console.log(stdout);
  });
};
