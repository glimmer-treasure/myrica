import { Command } from 'commander';
import * as editorconfig from './editor-config.js'

export const getCommand = () => {
    const command = new Command('init');
    command.addCommand(editorconfig.getCommand())
    return command
}