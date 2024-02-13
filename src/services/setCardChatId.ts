
import { STEPS } from "./steps";

const ID_BOARDS = '5ff8508fa9111b629721126f'
export const setCardChatId = async (phone: string, chatId: string): Promise<string> => {

    let query = phone
        .replaceAll('+', '')
        .trim()

    const url = `${process.env.TRELLO_API_URL}/card?idBoards=${ID_BOARDS}&modelTypes=cards&key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_API_TOKEN}&query=name:${query}`
    const response = await fetch(url, {
        method: 'GET'
    })
    const result = await response.json()

    const cards = result.cards

    if (!cards || !cards.length) return 'Не найдено, попробуйте поменять формат!'

    const card = cards[0]


    return await fetchListName(card.idList)
}

const fetchListName = async (listId: string): Promise<string> => {

    const url = `${process.env.TRELLO_API_URL}/list/${listId}?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_API_TOKEN}`
    const response = await fetch(url, {
        method: 'GET'
    })
    const result = await response.json()
    const index: number = parseInt(result.name?.split('.')[0])
    const step = STEPS[index]
    const nextStep = STEPS[index + 1]

    const status = 'Статус: *' + step.name + '*\n' +
        'займет ' + step.duration + '\n' +
        'Следующий этап: ' + nextStep.name
    return status
}