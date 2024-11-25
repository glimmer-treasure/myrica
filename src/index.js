import { Command } from 'commander';
import { getInitCommand } from './init.js'
const program = new Command();

program.addCommand(getInitCommand());
await program.parseAsync(process.argv);