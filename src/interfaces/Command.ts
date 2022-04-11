import { Message } from "discord.js";

export interface Command {
    commandName: String
    execute(message: Message, args?: String[])
}