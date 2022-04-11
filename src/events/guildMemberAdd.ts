import { GuildMember } from "discord.js";

export const guildMemberAdd = async (member: GuildMember) => {
    const systemChannel = member.guild.systemChannel;
    if (!systemChannel) return;
    
    member.guild.systemChannel.send(`Hey <@${member.user.id}>, welcome to **${member.guild.name}**!`)
};