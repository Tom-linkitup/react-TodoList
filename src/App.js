import { useState } from "react"
import { Routes, Route, Link } from "react-router-dom"
import Todo from "./Todo"
import Register from "./Register"
import Login from "./Login"
import Home from './Home'

const App = () => {

    return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </>
    )
}
export default App;