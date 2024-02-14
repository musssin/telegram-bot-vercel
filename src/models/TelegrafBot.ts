import { Telegraf } from "telegraf";
const BOT_TOKEN = process.env.BOT_TOKEN || '';

class TelegrafBot {
    static instance: Telegraf;
    constructor() {
        throw new Error('Use TelegrafBot.getInstance()');
    }
    static getInstance() {
        if (!TelegrafBot.instance) {
            TelegrafBot.instance = new Telegraf(BOT_TOKEN);;
        }
        return TelegrafBot.instance;
    }
}

export default TelegrafBot