require("dotenv").config();

import Discordbot from './Discordbot';
import { connect } from 'mongoose';

run().catch(err => console.log(err));

async function run() {
    await connect(process.env.mongo_uri);
}

const bot: Discordbot = new Discordbot();

export default bot;