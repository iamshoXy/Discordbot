require("dotenv").config();

import { Client, Intents } from 'discord.js';
import fs from 'fs';
import chalk from 'chalk';

class Discordbot extends Client {
    public constructor() {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES
            ]
        });

        fs.readdir('./src/events/', (err, files) => {
            files.forEach(file => {
                const event = require(`./events/${file}`);
                const eventName = file.substring(0, file.lastIndexOf('.'));
                super.on(eventName, event[eventName]);
            });

            console.log(chalk.green(`[EVENTS]`), `Successfully loaded ${files.length} event(s)`);
        });

        super.login(process.env.token);
    }
}

export default Discordbot;