import { useState, useRef, useEffect } from "react";
import "./all.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Todo = () => {
    const inputRef = useRef("");
    const [input, setInput] = useState('');
    const [tab, setTab] = useState('');
    const [tasks, setTasks] = useState([]);
    // Api 取回的列表
    const [dbTask, setDbTask] = useState([]);

    const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0MzIiLCJzY3AiOiJ1c2VyIiwiYXVkIjpudWxsLCJpYXQiOjE2NjIwMzk3MDksImV4cCI6MTY2MzMzNTcwOSwianRpIjoiMTVmOTE4ZWEtMmM0ZC00YmQwLWE5YjgtYTg0ZTE3NjE2OTZjIn0.cTu7IDIq3OLUW8s7a22OlC1O4Zn0i7qOKjW7bDDgbQo';

    const init = async (token) => {
        const API = "https://todoo.5xcamp.us/todos"
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        }
        const response = await fetch(API, requestOptions).catch(error=> { console.log(error) })
        const responseJson = await response.json()
        setDbTask(responseJson.todos);
        setTasks(responseJson.todos);
    }
    // 首次渲染畫面
    useEffect(() => { init() }, []);

    return (
        <div id="todoListPage" className="bg-half">
            <nav>
                <h1><a href="#">ONLINE TODO LIST</a></h1>
            </nav>
            <div className="container todoListPage vhContainer">
                <div className="todoList_Content">
                    <div className="inputBox">
                        <input type="text" placeholder="請輸入待辦事項" ref={inputRef} />
                        <a href="#" onClick={addTask}>
                        <FontAwesomeIcon icon={['fa', 'plus']} />
                        </a>
                    </div>
                    <div className="todoList_list">
                        <ul className="todoList_tab" onClick={handleTabs}>
                            <li><a href="#" className="active">全部</a></li>
                            <li><a href="#">待完成</a></li>
                            <li><a href="#">已完成</a></li>
                        </ul>
                        <div className="todoList_items">
                            <div>
                                <ul className='todoList_item'>
                                    {tasks.map((item, index) => (
                                    <li key={index}>
                                        <label className="todoList_label">
                                        <input className="todoList_input" type="checkbox" />
                                        <span>{item.content}</span>
                                        </label>
                                        <a href="#" >
                                        <FontAwesomeIcon icon={['fa', 'times']} />
                                        </a>
                                    </li>
                                    ))}
                                </ul>
                                <div className="todoList_statistics">
                                    <p>個已完成項目</p>
                                    <a href="#">清除已完成項目</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Todo;
