import { Message } from "discord.js";

export interface Command {
    commandName: String
    execute(cmdName: String, message: Message, args?: String[])
}