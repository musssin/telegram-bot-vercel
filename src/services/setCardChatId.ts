
import { CHAT_FIELD_ID } from "./constants";
import { fetchCardByPhone } from "./fetchCardByPhone";
import createDebug from 'debug';
const debug = createDebug('bot:about_command');
export const setCardChatId = async (phone: string, chatId: string): Promise<string> => {

    const card = await fetchCardByPhone(phone)

    if (!card) return 'Не найдено, попробуйте поменять формат!'

    const url = `${process.env.TRELLO_API_URL}/cards/${card.id}/customField/${CHAT_FIELD_ID}/item?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_API_TOKEN}`
    const body = { "value": { "text": chatId } }

    try {

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        debug(await response.text())
        return 'Вы успешно подписались!'

    } catch (e) {

        debug(e)
        return 'Не удалось подписаться, попробуйте позднее...'
    }



}
