import { Scenes, Telegraf } from "telegraf";
const BOT_TOKEN = process.env.BOT_TOKEN || '';

class TelegrafBot {
    static instance: Telegraf<Scenes.SceneContext>;
    constructor() {
        throw new Error('Use TelegrafBot.getInstance()');
    }
    static getInstance() {
        if (!TelegrafBot.instance) {
            TelegrafBot.instance = new Telegraf<Scenes.SceneContext>(BOT_TOKEN)
        }
        return TelegrafBot.instance;
    }
}

export default TelegrafBot