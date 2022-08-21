import * as React from "react";
import { useState } from "react";
import "./App.css";
import "./all.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Input = (props) => {

  const [content, setContent] = useState("");

  const addTask = () => {
    let task = {
      content: content,
      isCompleted: false 
    }

    props.setTaskList([task, ...props.taskList]);
  }

  return (
    <>
      <div className="inputBox">
        <input type="text" placeholder="請輸入待辦事項" required="true" onChange={(e) => setContent(e.target.value)} />
        <a href="#" onClick={addTask}>
          <FontAwesomeIcon icon={['fa', 'plus']} />
        </a>
      </div>
    </>
  )
}

const TaskList = (props) => {

  return (
    <>
      {props.taskList.map((item) => (
        <li key={item}>
          <label className="todoList_label">
            <input className="todoList_input" type="checkbox" value="true" checked={item.isCompleted ? true : false} />
            <span>{item.content}</span>
          </label>
          <a href="#">
            <FontAwesomeIcon icon={['fa', 'times']} />
          </a>
        </li>
      ))}
    </>
  )
}

function App() {

  const [taskList, setTaskList] = useState([
    { content: "go to shopping", isCompleted: false },
    { content: "see doctor", isCompleted: true }
  ]);

  return (
    <div id="todoListPage" className="bg-half">
        <nav>
            <h1><a href="#">ONLINE TODO LIST</a></h1>
        </nav>
        <div className="container todoListPage vhContainer">
            <div className="todoList_Content">
                <Input taskList={taskList} setTaskList={setTaskList} />
                <div className="todoList_list">
                    <ul className="todoList_tab">
                        <li><a href="#" id='all'>全部</a></li>
                        <li><a href="#" id='pending'>待完成</a></li>
                        <li><a href="#" id='completed'>已完成</a></li>
                    </ul>
                    <div className="todoList_items">
                    <div>
                        <ul className='todoList_item'>
                          <TaskList taskList={taskList} />
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
  );
}

export default App;