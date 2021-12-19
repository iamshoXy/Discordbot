import chalk from 'chalk';
import glob from 'glob';
import path from 'path';
import { promisify } from 'util';
import { Client } from 'discord.js';

const globPromisify = promisify(glob)

export async function loadEvents(client: Client) {
    const dir_root = path.join(__dirname, '../events/'), pattern = path.join(dir_root, '*.ts');
    globPromisify(pattern).then(async (files)=> {
        for (const file of files) {
            const event = await import(file);
            const eventName = file.substring(file.lastIndexOf('/') + 1).replace('.ts', '');
            client.on(eventName, event[eventName]);
        }

        console.log(chalk.green('[EVENTS]'), `Successfully loaded ${files.length} event(s)`);
    }).catch((e) => {
        console.log(e.message);
    });
}