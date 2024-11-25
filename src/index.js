import { Command } from 'commander';
import * as init from './commands/init.js'
const program = new Command();

program.addCommand(init.getCommand());
await program.parseAsync(process.argv);