import chalk from 'chalk';
import { exec } from 'child_process';
import { removeFolder } from '../file/index.js';

export const generate = async (name: string) => {
  const process = exec(
    `git clone https://github.com/avocadoteam/react-template.git ${name} && cd ${name} & pnpm i`,
    (err, stdout, stderr) => {
      removeFolder(`${name}/.git`);
      console.log(chalk.blue('happy hacking!'));
    }
  );
  process.stdout?.setEncoding('utf8');
  process.stdout?.on('data', (message) => {
    console.log(message);
  });
  process.stderr?.setEncoding('utf8');
  process.stderr?.on('data', (message) => {
    console.log(chalk.red(message));
  });
};
