import { Message } from 'discord.js';
import { Command } from 'interfaces/Command';
import { getUserFromMention } from '../../utils/getUserFromMention';
import parse from 'parse-duration';

const command: Command = {
    commandName: 'ban',
    async execute(message: Message, args: string[]) {
        const user = await getUserFromMention(message.guild, args[0]);
        if (!user) {
            message.reply('The mentioned user could not be found.');
            return;
        }

        let duration = parse(args[1]);
        if (duration == null) duration = 0;

        const reason = args.splice(2).join(' ');

        duration = (duration) / (1000*60*60*24);
        
        user.ban({ days: duration, reason: reason }).then(() => {
            message.reply(`The user ${user.user.username} was banned from the server. Duration: ${duration != 0 ? duration : "Infinite"} Reason: ${reason.length != 0 ? reason : 'No reason specificed.'}`);
        }).catch((error) => {
            console.log(`An error has occurred. Error: ${error}`);
        });
    }
}

export = command;