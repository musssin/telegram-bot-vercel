import createDebug from 'debug';
const debug = createDebug('bot:about_command');

const fetchCardById = async (id: string): Promise<any> => {

    try {

        const url = `${process.env.TRELLO_API_URL}/cards/${id}/?customFieldItems=true&key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_API_TOKEN}`
        const response = await fetch(url, {
            method: 'GET'
        })

        return await response.json()

    } catch (error) {
        debug(error)
        return null
    }

}

export { fetchCardById }

