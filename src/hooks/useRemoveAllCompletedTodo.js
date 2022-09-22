const useRemoveAllCompletedTodo = async (token, ids) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
  }

  const APIs = ids.map(id => `https://todoo.5xcamp.us/todos/${id}`);

  Promise.all(APIs.map(async url => {
    await fetch(url, requestOptions).catch(error => { console.log(error) })
  }))
}

export default useRemoveAllCompletedTodo