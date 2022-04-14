import { Message } from 'discord.js';
import { Command } from 'interfaces/Command';

const command: Command = {
    commandName: 'invite',
    async execute(message: Message, args: String[]) {
        const inviteCount = await message.guild.invites.fetch();

        if (inviteCount.size > 0) {
            const invite = inviteCount.first();
            message.channel.send(`https://discord.gg/${invite.code}`);
            return;
        }

        const invite = await message.guild.invites.create(message.channel.id);
        message.channel.send(`https://discord.gg/${invite.code}`);
    }
};

export = command;