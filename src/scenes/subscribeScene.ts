import { Context, Scenes } from 'telegraf';
import createDebug from 'debug';
import { Message } from 'telegraf/typings/core/types/typegram';
import { setCardChatId } from '../services/setCardChatId';
import { fetchStatus } from '../services/fetchStatus';
const debug = createDebug('bot:about_command');

const { leave } = Scenes.Stage;
const count = 0
const subscribePhone = () => async (ctx: Scenes.SceneContext) => {

  const message = ctx.message as Message.TextMessage
  const result = await setCardChatId(message.text, message.chat.id.toString())

  const status = await fetchStatus(message.text)

  const resultWithStatus = result + '\n' + status
  await ctx.replyWithMarkdownV2(resultWithStatus, { parse_mode: 'Markdown' })

  ctx.scene.enter('menuScene')
}

const subscribeScene = new Scenes.BaseScene<Scenes.SceneContext>("subscribeScene");

const message = `*Введите ваш номер:*\n в формате: \\+7\\(XXX\\)XXX\\-XX\\-XX\\)`;
subscribeScene.enter(ctx => ctx.replyWithMarkdownV2(message));
subscribeScene.command("back", leave<Scenes.SceneContext>());
subscribeScene.on("message", subscribePhone());



export { subscribeScene };
