import { Scenes, Telegraf, session } from 'telegraf';

import { menuScene, statusScene, subscribeScene } from './scenes';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';

const bot = new Telegraf<Scenes.SceneContext>(BOT_TOKEN);

const stage = new Scenes.Stage<Scenes.SceneContext>([menuScene, statusScene, subscribeScene], {});

bot.use(session());
bot.use(stage.middleware());
bot.start(ctx => ctx.scene.enter('menuScene'))
// bot.command("status", ctx => ctx.scene.enter("statusScene"));
// bot.command("subscribe", ctx => ctx.scene.enter("subscribeScene"));
// bot.on("message", ctx => ctx.reply("Попробуйте /status или /subscribe"));


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

