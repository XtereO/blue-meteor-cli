#!/usr/bin/env node
import chalk from 'chalk';
import { exec } from 'child_process';
import { Command } from 'commander';
import {
  atom,
  brick,
  card,
  enumAction,
  format,
  hook,
  layout,
  modal,
  module,
  panel,
  popout,
  typeAction,
  util,
} from './actions/index.js';
import { removeFolder } from './file/index.js';
const commander = new Command();

commander.version('1.1.1').description('Configuration files creator.');

commander
  .command('generate [project-name]')
  .alias('g')
  .description('Create new project template')
  .action(async (name) => {
    exec(
      `git clone https://github.com/avocadoteam/react-template.git ${name} && cd ${name} & pnpm i`,
      (err, stdout, stderr) => {
        removeFolder(`${name}/.git`);
        console.log(stdout);
        if (err || stderr) {
          console.log(chalk.red(err, stderr));
        }
      }
    );
  });

commander
  .command('layout <name>')
  .option('-t --test')
  .option('-c --css')
  .option('-r --remove')
  .alias('l')
  .description('Create new layout')
  .action(layout);

commander
  .command('panel <panel-name> <layout-name>')
  .option('-t --test')
  .option('-c --css')
  .option('-r --remove')
  .alias('p')
  .description('Create new panel in layout')
  .action(panel);

commander
  .command('modal <name>')
  .option('-t --test')
  .option('-c --css')
  .option('-r --remove')
  .alias('m')
  .description('Create new modal')
  .action(modal);

commander
  .command('card <name>')
  .option('-t --test')
  .option('-c --css')
  .option('-r --remove')
  .alias('c')
  .description('Create new card')
  .action(card);

commander
  .command('popout <name>')
  .option('-t --test')
  .option('-c --css')
  .option('-r --remove')
  .alias('po')
  .description('Create new popout')
  .action(popout);

commander
  .command('brick <name>')
  .option('-t --test')
  .option('-c --css')
  .option('-r --remove')
  .alias('b')
  .description('Create new brick')
  .action(brick);

commander
  .command('atom <name>')
  .option('-t --test')
  .option('-c --css')
  .option('-r --remove')
  .alias('a')
  .description('Create new atom')
  .action(atom);

commander
  .command('module <name>')
  .alias('mo')
  .option('-t --test')
  .option('-r --remove')
  .description('Create new module')
  .action(module);

commander
  .command('util <name>')
  .alias('u')
  .option('-t --test')
  .option('-r --remove')
  .description('Create new util')
  .action(util);

commander
  .command('hook <name>')
  .alias('h')
  .option('-t --test')
  .option('-r --remove')
  .description('Create new hook')
  .action(hook);

commander
  .command('type <name>')
  .alias('t')
  .option('-r --remove')
  .description('Create new type')
  .action(typeAction);

commander
  .command('enum <name>')
  .alias('e')
  .option('-r --remove')
  .description('Create new enum')
  .action(enumAction);

commander
  .command('format')
  .alias('f')
  .description('format current directory')
  .action(format);

commander.parse(process.argv);
