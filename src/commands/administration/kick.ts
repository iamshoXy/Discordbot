import { Message } from 'discord.js';
import { Command } from 'interfaces/Command';
import { getUserFromMention } from '../../utils/getUserFromMention';

const command: Command = {
    commandName: 'kick',
    async execute(message: Message, args: string[]) {
        const user = await getUserFromMention(message.guild, args[0]);
        if (!user) {
            message.reply('The mentioned user could not be found.');
            return;
        }

        const reason = args.splice(1).join(' ');

        user.kick(reason).then(() => {
            message.reply(`The user ${user.user.username} was kicked from the server. Reason: ${reason.length != 0 ? reason : 'No reason specificed.'}`);
        }).catch((error) => {
            console.log(`An error has occurred. Error: ${error}`);
        });
    }
}

export = command;