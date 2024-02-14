import { Telegraf, } from "telegraf";
import { ACTION_MOVING_CARD, CHAT_FIELD_ID } from "../services/constants";
import { STEPS } from "../services/steps";
import { fetchCardById } from "../services/fetchCardById";
import createDebug from 'debug';
import TelegrafBot from "../models/TelegrafBot";
const debug = createDebug('bot:about_command');
export const trelloWebHook = async (req: any, res: any) => {

    const bot = TelegrafBot.getInstance()
    try {


        const actionType = req.body?.action?.display?.translationKey;
        if (actionType !== ACTION_MOVING_CARD) return
        const cardShort = req.body?.action?.display?.entities?.card;
        const card = await fetchCardById(cardShort.id)
        if (!card) return

        const changedStatusIndex = parseInt(req.body?.action?.display?.entities?.listAfter?.text?.split('.')[0]);
        const changedStatus = STEPS[changedStatusIndex]
        const changedStatusNext = STEPS[changedStatusIndex + 1]

        const chatField = card.customFieldItems?.find((customField: any) => customField.idCustomField === CHAT_FIELD_ID)
        const chatId = chatField?.value?.text
        if (!chatId) return

        const message = 'Статус заказа изменился на: ' + changedStatus.name + '\n' +
            'займет ' + changedStatus.duration + '\n' +
            'Следующий этап: ' + changedStatusNext.name;

        bot.telegram.sendMessage(chatId, message);

    } catch (error: any) {
        bot.telegram.sendMessage('812794909', error?.message?.toString());
    }
}