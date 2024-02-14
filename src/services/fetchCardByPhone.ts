import createDebug from 'debug';
import { BOARD_ID } from "./constants"
const debug = createDebug('bot:about_command');
const fetchCardByPhone = async (phone: string): Promise<any> => {

    let query = phone
        .replaceAll('+', '')
        .trim()

    try {

        const url = `${process.env.TRELLO_API_URL}/search?idBoards=${BOARD_ID}&modelTypes=cards&key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_API_TOKEN}&query=name:${query}`
        const response = await fetch(url, {
            method: 'GET'
        })
        const result = await response.json()

        const cards = result.cards
        if (!cards || !cards.length) return null

        return cards[0]

    } catch (error) {
        debug(error)
        return null
    }

}

export { fetchCardByPhone }

