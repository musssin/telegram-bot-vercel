import { Markup, Scenes } from 'telegraf';
import createDebug from 'debug';
const debug = createDebug('bot:about_command');

const CHECK_STATUS = 'Проверить статус'
const SUBSCRIBE = 'Подписаться на обновления'

const menuScene = new Scenes.BaseScene<Scenes.SceneContext>("menuScene");

menuScene.enter(ctx => ctx.reply(
  "Проверьте статус заказа или подпишитесь на обновления статуса",
  Markup.keyboard([CHECK_STATUS, SUBSCRIBE]).oneTime().resize(),
),);
menuScene.hears(CHECK_STATUS, ctx => ctx.scene.enter('statusScene'));
menuScene.hears(SUBSCRIBE, ctx => ctx.scene.enter('subscribeScene'));
// menuScene.on("message", checkStatus());



export { menuScene };
