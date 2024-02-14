import { Context, Scenes } from 'telegraf';
import createDebug from 'debug';
import { Message } from 'telegraf/typings/core/types/typegram';
import { setCardChatId } from '../services/setCardChatId';
const debug = createDebug('bot:about_command');

const { leave } = Scenes.Stage;
const subscribePhone = () => async (ctx: Context) => {

  const message = ctx.message as Message.TextMessage
  const result = await setCardChatId(message.text, message.chat.id.toString())

  leave<Scenes.SceneContext>()
  subscribeScene.on('message', () => {})

  await ctx.replyWithMarkdownV2(result, { parse_mode: 'Markdown' })

}

const subscribeScene = new Scenes.BaseScene<Scenes.SceneContext>("subscribeScene");

const message = `*Введите ваш номер:*`;
subscribeScene.enter(ctx => ctx.replyWithMarkdownV2(message));

subscribeScene.on("message", subscribePhone());



export { subscribeScene };
