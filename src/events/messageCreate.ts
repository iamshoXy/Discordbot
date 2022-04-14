require('dotenv').config();

import { Message } from "discord.js";
import * as CommandHandler from "../struct/CommandHandler";
import * as LevelHandler from "../struct/LevelHandler";

export const messageCreate = async (message: Message) => {
    if (message.author.bot) return;

    LevelHandler.addEXP(message.author.id, 5);

    if (message.content.indexOf(process.env.prefix) !== 0) return;

    const args = message.content.slice(process.env.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    CommandHandler.execute(command, message, args);
};