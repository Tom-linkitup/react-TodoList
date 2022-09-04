const executeAddTodo = async (token, content) => {
    const API = `https://todoo.5xcamp.us/todos`
    const body = JSON.stringify({
        "todo": {
            content
        }
    })
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: body
    }
    const response = await fetch(API, requestOptions).catch(error=> { console.log(error) })
    const responseJson = await response.json()
    return responseJson
}

export default executeAddTodo