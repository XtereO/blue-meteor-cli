#!/usr/bin/env node

import chalk from 'chalk';
import { exec } from 'child_process';
import { Command } from 'commander';
import { copy } from 'fs-extra';
import {
  atom,
  brick,
  card,
  enumAction,
  hook,
  layout,
  modal,
  module,
  panel,
  popout,
  typeAction,
  util,
} from './actions/index.js';
const commander = new Command();

commander.version('1.0.0').description('Configuration files creator.');

commander
  .command('generate [name]')
  .alias('g')
  .description('Create new project template')
  .action(async (name) => {
    console.log(new URL('template', import.meta.url).pathname.slice(1));
    await copy(
      new URL('template', import.meta.url).pathname.slice(1),
      name ?? 'blumt-template'
    );
    exec(`cd ${name} & pnpm i`, (err, stdout, stderr) => {
      console.log(stdout);
      console.log(chalk.red(err, stderr));
    });
  });

commander
  .command('layout <name>')
  .option('-c --css')
  .option('-r --remove')
  .alias('l')
  .description('Create new layout')
  .action(layout);

commander
  .command('panel <panel-name> <layout-name>')
  .option('-c --css')
  .option('-r --remove')
  .alias('p')
  .description('Create new panel in layout')
  .action(panel);

commander
  .command('modal <name>')
  .alias('m')
  .description('Create new modal in layout')
  .action(modal);

commander
  .command('card <name>')
  .alias('c')
  .description('Create new card in layout')
  .action(card);

commander
  .command('popout <name>')
  .alias('po')
  .description('Create new popout in layout')
  .action(popout);

commander
  .command('brick <name>')
  .alias('b')
  .description('Create new brick')
  .action(brick);

commander
  .command('atom <name>')
  .alias('a')
  .description('Create new atom')
  .action(atom);

commander
  .command('module <name>')
  .alias('mo')
  .description('Create new module')
  .action(module);

commander
  .command('util <name>')
  .alias('u')
  .description('Create new util')
  .action(util);

commander
  .command('hook <name>')
  .alias('h')
  .description('Create new hook')
  .action(hook);

commander
  .command('type <name>')
  .alias('t')
  .description('Create new type')
  .action(typeAction);

commander
  .command('enum <name>')
  .alias('e')
  .description('Create new enum')
  .action(enumAction);

commander.parse(process.argv);
