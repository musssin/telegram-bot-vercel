import { Context, Telegraf } from 'telegraf';
import createDebug from 'debug';
import { fetchStatus } from '../services/fetchStatus';
import { Message } from 'telegraf/typings/core/types/typegram';

const debug = createDebug('bot:about_command');

const status = (bot: Telegraf) => async (ctx: Context) => {

  debug(`Triggered "status" command`);

  const message = `*Введите ваш номер:*`;

  await ctx.replyWithMarkdownV2(message)

  bot.on('message', checkStatus())

};

const checkStatus = () => async (ctx: Context) => {
  const message = ctx.message as Message.TextMessage
  const result = await fetchStatus(message.text)
  await ctx.replyWithMarkdownV2(result, { parse_mode: 'Markdown' })
}
export { status };
