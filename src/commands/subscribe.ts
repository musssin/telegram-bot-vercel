import { Context, Telegraf } from 'telegraf';
import createDebug from 'debug';
import { fetchStatus } from '../services/fetchStatus';
import { Message } from 'telegraf/typings/core/types/typegram';
import { setCardChatId } from '../services/setCardChatId';

const debug = createDebug('bot:about_command');

const subscribe = (bot: Telegraf) => async (ctx: Context) => {

  debug(`Triggered "subscribe" command`);

  const message = `*Введите ваш номер:*`;
  await ctx.replyWithMarkdownV2(message)

  bot.on('message', subscribePhone())

};

const subscribePhone = () => async (ctx: Context) => {

  const message = ctx.message as Message.TextMessage
  const result = await setCardChatId(message.text, message.chat.id.toString())
  await ctx.replyWithMarkdownV2(result, { parse_mode: 'Markdown' })
}
export { status };
