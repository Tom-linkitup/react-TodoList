const useRemoveTodo = async (token, id) => {
    const API = `https://todoo.5xcamp.us/todos/${id}`
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    }
    await fetch(API, requestOptions).catch(error=> { console.log(error) })
}

export default useRemoveTodo