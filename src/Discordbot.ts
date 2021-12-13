require("dotenv").config();

import { Client, Intents } from 'discord.js';

class Discordbot extends Client {
    public constructor() {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES
            ]
        });

        super.login(process.env.token);
    }
}

export default Discordbot;