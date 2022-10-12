import { useState, useRef, useEffect } from "react"
import "../all.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, Link } from "react-router-dom"
import useGetTodo from "../hooks/useGetTodo"
import useAddTodo from '../hooks/useAddTodo'
import useToggleTodo from '../hooks/useToggleTodo'
import useRemoveTodo from '../hooks/useRemoveTodo'
import useRemoveAllCompletedTodo from "../hooks/useRemoveAllCompletedTodo"
import { useAuth } from "./Context"

const Todo = () => {
  const { token } = useAuth();
  const inputRef = useRef("");
  const [tab, setTab] = useState('');
  const [tasks, setTasks] = useState([]);
  // Api 取回的列表用於tab切換時
  const [dbTask, setDbTask] = useState([]);

  const init = async () => {
    const apiTasks = await useGetTodo(token);
    setDbTask(apiTasks.todos);
    setTasks(apiTasks.todos);
  }

  const addTask = async (e) => {
    e.preventDefault();
    const response = await useAddTodo(token, inputRef.current.value);
    const newTask = {
      content: response.content,
      id: response.id,
      completed_at: null
    }
    inputRef.current.value = "";
    inputRef.current.focus();
    setTasks([...tasks, newTask]);
    setDbTask([...dbTask, newTask]);
  }

  const toggleTask = async (index, id) => {
    const newTasks = [...tasks];
    const response = await useToggleTodo(token, id);
    newTasks[index].completed_at = response.completed_at;
    if (tab === "pending") {
      newTasks.splice(index, 1)
    } else if (tab === "completed") {
      newTasks.splice(index, 1)
    }
    setTasks(newTasks);
  }

  const removeTask = async (e, index, id) => {
    e.preventDefault();
    const newTasks = [...tasks];
    useRemoveTodo(token, id);
    newTasks.splice(index, 1);
    setTasks(newTasks);
    setDbTask(dbTask.filter(task => task.id !== id));
  }

  const handleTabs = (e) => {
    clearAllTabs()
    e.target.classList.add("active");
    switch (e.target.id) {
      case "all":
        setTasks(dbTask);
        setTab("");
        break;
      case "pending":
        setTasks(dbTask.filter(task => task.completed_at === null));
        setTab("pending");
        break;
      case "completed":
        setTasks(dbTask.filter(task => task.completed_at !== null));
        setTab("completed");
        break;
    }
  }

  const clearAllTabs = () => {
    let tabs = document.querySelectorAll(".todoList_tab li a");
    tabs.forEach(tab => tab.classList.remove("active"));
  }

  const handleClearAllCompleted = async (e) => {
    e.preventDefault();
    const completedTaskIds = [];
    const unCompletedTask = dbTask.filter(task => {
      if (task.completed_at !== null) {
        completedTaskIds.push(task.id);
      }
      return task.completed_at === null;
    })
    useRemoveAllCompletedTodo(token, completedTaskIds);
    setTasks(unCompletedTask);
    setDbTask(unCompletedTask);
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
              <li><Link to="/todo" id="all" className="active">全部</Link></li>
              <li><Link to="/todo" id="pending">待完成</Link></li>
              <li><Link to="/todo" id="completed">已完成</Link></li>
            </ul>
            <div className="todoList_items">
              <div>
                <ul className='todoList_item'>
                  {tasks.map((task, index) => (
                    <li key={index}>
                      <label className="todoList_label">
                        <input className="todoList_input" type="checkbox"
                          onChange={() => toggleTask(index, task.id)}
                          checked={task.completed_at !== null ? true : false} />
                        <span>{task.content}</span>
                      </label>
                      <a href="#" onClick={(e) => removeTask(index, task.id)}>
                        <FontAwesomeIcon icon={['fa', 'times']} />
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="todoList_statistics">
                  <p>{dbTask.filter(task => task.completed_at !== null).length}個已完成項目</p>
                  <a href="#" onClick={handleClearAllCompleted}>清除已完成項目</a>
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