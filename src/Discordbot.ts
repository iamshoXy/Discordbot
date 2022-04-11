require("dotenv").config();

import { Client, Intents } from 'discord.js';
import * as CommandHandler from './struct/CommandHandler';
import * as EventHandler from './struct/EventHandler';

class Discordbot extends Client {
    public client: Client;

    public constructor() {
        var options = {
            intents: [
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES
            ]
        }

        super(options);

        this.client = new Client(options)
        
        CommandHandler.loadCommands();
        EventHandler.loadEvents(this.client);

        this.client.login(process.env.token);
    }

    public getClient() {
        return this.client;
    }
}

export default Discordbot;