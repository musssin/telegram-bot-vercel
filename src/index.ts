import { Scenes, Telegraf, session } from 'telegraf';

import { statusScene, subscribeScene } from './scenes';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';
import express = require('express');
import bodyParser = require('body-parser');
import { trelloWebHook } from './webhooks/trello';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';

const bot = new Telegraf<Scenes.SceneContext>(BOT_TOKEN);

const stage = new Scenes.Stage<Scenes.SceneContext>([statusScene, subscribeScene], {
  ttl: 100
});

bot.use(session());
bot.use(stage.middleware());

bot.command("status", ctx => ctx.scene.enter("statusScene"));
bot.command("subscribe", ctx => ctx.scene.enter("subscribeScene"));
bot.on("message", ctx => ctx.reply("Попробуйте /status или /subscribe"));


//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);

// const app = express()
// app.use(bodyParser.json())

// app.post('/trello-webhook', trelloWebHook);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Сервер запущен на порту ${PORT}`);
// });

