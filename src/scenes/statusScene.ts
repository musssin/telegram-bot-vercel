import { Markup, Scenes } from 'telegraf';
import createDebug from 'debug';
import { fetchStatus } from '../services/fetchStatus';
import { Message } from 'telegraf/typings/core/types/typegram';
import { CHECK_STATUS, GREETING, SUBSCRIBE, BACK } from '../services/constants';
const debug = createDebug('bot:about_command');

const checkStatus = () => async (ctx: Scenes.SceneContext) => {
  const message = ctx.message as Message.TextMessage
  debug(`Triggered "checkStatus" command`);

  if ([CHECK_STATUS, SUBSCRIBE, BACK].includes(message.text)) return

  const result = await fetchStatus(message.text)

  await ctx.reply(result,
    Markup.keyboard([CHECK_STATUS, SUBSCRIBE]).oneTime().resize())

  if (!result.error) ctx.scene.leave()


}

const statusScene = new Scenes.BaseScene<Scenes.SceneContext>("statusScene");

const message = `
📱 Введите ваш номер телефона:
Пожалуйста, укажите номер телефона, который вы предоставили при оформлении заказа у нашего менеджера, в формате:

 +7(XXX)XXX-XX-XX

Это необходимо для верификации и будет использоваться для отслеживания статуса вашего заказа через наш телеграм-бот. Напишите тот номер, который вы указали в образце списка при заказе

Еще можете Подписаться и «Отслеживать статус вашего заказа ♻ »  чтобы получать мгновенные уведомления о любых изменениях.`;
statusScene.enter(ctx => ctx.reply(message, Markup.keyboard([CHECK_STATUS, SUBSCRIBE, BACK]).oneTime().resize()));
statusScene.command("start", ctx => {
  ctx.scene.leave();
  ctx.reply(GREETING, Markup.keyboard([CHECK_STATUS, SUBSCRIBE]).oneTime().resize());
});
statusScene.command(BACK, ctx => ctx.scene.leave());
statusScene.hears(CHECK_STATUS, ctx => ctx.scene.enter('statusScene'));
statusScene.hears(SUBSCRIBE, ctx => ctx.scene.enter('subscribeScene'));
statusScene.on("message", checkStatus());



export { statusScene };
