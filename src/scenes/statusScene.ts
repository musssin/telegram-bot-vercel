import { Context, Scenes } from 'telegraf';
import createDebug from 'debug';
import { fetchStatus } from '../services/fetchStatus';
import { Message } from 'telegraf/typings/core/types/typegram';
const debug = createDebug('bot:about_command');

const { leave } = Scenes.Stage;
let count = 0
const checkStatus = () => async (ctx: Context) => {
  if (count > 1) {
    leave<Scenes.SceneContext>()
    return
  }
  count++
  
  const message = ctx.message as Message.TextMessage
  debug(`Triggered "checkStatus" command`);
  const result = await fetchStatus(message.text)

  await ctx.replyWithMarkdownV2(result, { parse_mode: 'Markdown' })

  

}

const statusScene = new Scenes.BaseScene<Scenes.SceneContext>("statusScene");

const message = `*Введите ваш номер:*`;
statusScene.enter(ctx => ctx.replyWithMarkdownV2(message));

statusScene.on("message", checkStatus());



export { statusScene };
