
import { fetchCardByPhone } from "./fetchCardByPhone";
import { STEPS } from "./steps";

export const fetchStatus = async (phone: string): Promise<string> => {

    const card = await fetchCardByPhone(phone)

    if (!card) return 'Не найдено, попробуйте поменять формат!'

    const url = `${process.env.TRELLO_API_URL}/list/${card.idList}?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_API_TOKEN}`

    try {

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

    } catch (error) {
        return 'Не определен, попробуите позднее...'
    }

}
