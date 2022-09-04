import { useState } from "react"
import { Routes, Route, Link } from "react-router-dom";
import Todo from "./Todo";
import Register from "./Register";

const App = () => {

    return (
      <>
        <Routes>
          <Route path="/todo" element={<Todo />} />
          <Route path="/" element={<Register />} />
        </Routes>
      </>
    )
}
export default App;