import { Message } from 'discord.js';
import { Command } from 'interfaces/Command';
import { createRankImage } from '../../struct/ImageHandler';
import { getLevel, getTotalEXP, getLeaderboardPosition, getRequiredEXP } from '../../struct/LevelHandler';

const command: Command = {
    commandName: 'rank',
    async execute(message: Message, args: String[]) {
        const position = await getLeaderboardPosition(message.author.id);
        const currentLevel = await getLevel(message.author.id);
        const totalEXP = await getTotalEXP(message.author.id);
        const requiredEXP = await getRequiredEXP(currentLevel);

        createRankImage(message, position, currentLevel, totalEXP, requiredEXP);
    }
};

export = command;