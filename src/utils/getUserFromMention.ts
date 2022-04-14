import { Guild, GuildMember } from 'discord.js';

export const getUserFromMention = async (guild: Guild, mention: string): Promise<GuildMember> => {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return guild.members.cache.get(mention);
	}
}