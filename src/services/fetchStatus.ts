
export const fetchStatus = async (phone: string): Promise<string> => {

    let query = phone
        .replaceAll(' ', '')
        .replaceAll('(', '')
        .replaceAll(')', '')
        .replaceAll('-', '')

    const url = `${process.env.TRELLO_API_URL}/search?modelTypes=cards&key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_API_TOKEN}&query=${query}`
    const response = await fetch(url, {
        method: 'GET'
    })
    const result = await response.json()

    const cards = result.cards

    if (!cards || !cards.length) return 'Не найдено'


    return JSON.stringify(result)
}