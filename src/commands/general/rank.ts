import { Message } from 'discord.js';
import { Command } from 'interfaces/Command';
import { getLevel, getTotalEXP, getLeaderboardPosition, getRequiredEXP } from '../../struct/LevelHandler';

const command: Command = {
    commandName: 'rank',
    async execute(message: Message, args: String[]) {
        const position = await getLeaderboardPosition(message.author.id);
        const currentLevel = await getLevel(message.author.id);
        const totalEXP = await getTotalEXP(message.author.id);
        const requiredEXP = await getRequiredEXP(currentLevel);

        message.reply(`Your level: **${currentLevel}** - Leaderboard rank: **#${position}** - EXP: **${totalEXP}/${requiredEXP}**`)
    }
};

export = command;