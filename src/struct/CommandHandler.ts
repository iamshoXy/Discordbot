import chalk from 'chalk';
import glob from 'glob';
import path from 'path';
import { promisify } from 'util';
import { Command } from '../interfaces/Command';
import { Message} from 'discord.js';

var commands = [] as Command[];
const globPromisify = promisify(glob)

export async function loadCommands() {
    const dir_root = path.join(__dirname, '../commands/**'), pattern = path.join(dir_root, '*.ts');
    globPromisify(pattern).then(async (files)=> {
        for (const file of files) {
            const command = await import(file) as Command
            commands.push(command);
        }

        console.log(chalk.green('[COMMANDS]'), `Successfully loaded ${files.length} command(s)`);
    }).catch((e) => {
        console.log(e.message);
    });
}

export function execute(cmdName: String, message: Message, args: String[]) : void {
    const command = commands.find(c => c.commandName == cmdName);

    if (command) {
        command.execute(message, args);
    } else {
        message.reply(`There\'s no command called ${cmdName}.`);
    }
}