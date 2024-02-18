import { Markup, Scenes } from 'telegraf';
import createDebug from 'debug';
import { CHECK_STATUS, SUBSCRIBE } from '../services/constants';
const debug = createDebug('bot:about_command');



const menuScene = new Scenes.BaseScene<Scenes.SceneContext>("menuScene");

menuScene.enter(ctx => ctx.reply(
  "Проверьте статус заказа или подпишитесь на обновления статуса",
  Markup.keyboard([CHECK_STATUS, SUBSCRIBE]).oneTime().resize(),
),);
menuScene.hears(CHECK_STATUS, ctx => ctx.scene.enter('statusScene'));
menuScene.hears(SUBSCRIBE, ctx => ctx.scene.enter('subscribeScene'));
// menuScene.on("message", checkStatus());



export { menuScene };
