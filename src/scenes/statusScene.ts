import { Context, Scenes } from 'telegraf';
import createDebug from 'debug';
import { fetchStatus } from '../services/fetchStatus';
import { Message } from 'telegraf/typings/core/types/typegram';
const debug = createDebug('bot:about_command');

const { leave } = Scenes.Stage;

const checkStatus = () => async (ctx: Context) => {
  const message = ctx.message as Message.TextMessage
  debug(`Triggered "checkStatus" command`);
  ctx.telegram.sendMessage('812794909', 'hi');
  const result = await fetchStatus(message.text)

  await ctx.replyWithMarkdownV2(result, { parse_mode: 'Markdown' })

  leave<Scenes.SceneContext>()

}

const statusScene = new Scenes.BaseScene<Scenes.SceneContext>("statusScene");

const message = `*Введите ваш номер:*`;
statusScene.enter(ctx => ctx.replyWithMarkdownV2(message));

statusScene.on("message", checkStatus());



export { statusScene };
