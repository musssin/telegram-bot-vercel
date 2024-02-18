
import { StatusForm } from "../models/StatusForm";
import { fetchCardByPhone } from "./fetchCardByPhone";
import { STEPS } from "./steps";

export const fetchStatus = async (phone: string): Promise<StatusForm> => {
    const status: StatusForm = {
        error: true,
        text: ''
    }
    const card = await fetchCardByPhone(phone)

    if (!card) {
        status.text = 'Не найдено, попробуйте поменять формат!'
        return status
    } 

    const url = `${process.env.TRELLO_API_URL}/list/${card.idList}?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_API_TOKEN}`

    try {

        const response = await fetch(url, {
            method: 'GET'
        })
        const result = await response.json()

        const index: number = parseInt(result.name?.split('.')[0])

        const step = STEPS[index]
        status.error = false
        status.text = step.desc ?? 'Статус неопределен...'
        return status

    } catch (error) {
        status.error = false
        status.text = 'Не определен, попробуите позднее...'
        return status
    }

}
