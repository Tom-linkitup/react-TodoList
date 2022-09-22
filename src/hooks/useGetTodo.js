const useGetTodo = async (token) => {
    const API = "https://todoo.5xcamp.us/todos"
    const request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    }
    const response = await fetch(API, request).catch(error => { console.log(error) })
    const data = await response.json()

    return data;
}

export default useGetTodo;