require('dotenv').config();

import { Message } from "discord.js";
import * as CommandHandler from "../struct/CommandHandler";

export const messageCreate = async (message: Message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(process.env.prefix) !== 0) return;

    const args = message.content.slice(process.env.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    CommandHandler.execute(command, message, args);
};