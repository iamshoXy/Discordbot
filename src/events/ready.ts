import { Client } from "discord.js";

export const ready = async (client: Client) => {
    console.log("Client is ready! " + client.user.tag);
};