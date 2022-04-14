import { Message } from "discord.js";
import User from "../models/user";

async function getUser(authorId: string) {
    let user = null;

    user = await User.findOne({ authorId: authorId });
    if (!user) {
        user = await User.create({
            authorId: authorId,
            level: 0,
            totalEXP: 0
        });
    }

    return user;
}

export async function addEXP(message: Message, exp: number) {
    let user = await getUser(message.author.id);
    if (user == null) throw new Error("No user could be found.");

    let totalEXP = user.totalEXP;
    totalEXP += exp;

    await User.findOneAndUpdate({
        authorId: message.author.id
    }, {
        totalEXP: totalEXP
    });

    let requiredEXP = await getRequiredEXP(user.level);
    if (totalEXP >= requiredEXP) {
        let newLevel = await addLevel(message.author.id);
        message.reply(`You ranked up! New level: **${newLevel}**`);
    }
}

export async function addLevel(authorId: string) {
    let user = await getUser(authorId);
    if (user == null) throw new Error("No user could be found.");

    let currentLevel = user.level;
    currentLevel += 1;

    await User.findOneAndUpdate({
        authorId: authorId
    }, {
        level: currentLevel
    });

    return currentLevel;
}

export async function getLevel(authorId: string): Promise<number> {
    let user = await getUser(authorId);
    if (user == null) throw new Error("No user could be found.");

    return user.level;
}

export async function getTotalEXP(authorId: string) {
    let user = await getUser(authorId);
    if (user == null) throw new Error("No user could be found.");

    return user.totalEXP;
}

export async function getLeaderboardPosition(authorId: string) {
    let user = await getUser(authorId);
    if (user == null) throw new Error("No user could be found.");

    const sortedLeaderboard = await User.find({}).sort({ totalEXP: -1 }).exec();

    return sortedLeaderboard.findIndex(x => x.id == user.id) + 1;
}

export async function getRequiredEXP(level: number): Promise<number> {
    if (isNaN(level)) throw new RangeError("Please specify a number.");
    if (level < 0) throw new RangeError("Please specify a positive number.");

    return level * 100;
}