import { useState } from "react"
import { Routes, Route, Link, Outlet } from "react-router-dom"
import Todo from "./components/Todo"
import Register from "./components/Register"
import Login from "./components/Login"
import Home from './components/Home'
import { AuthContext } from "./components/Context"
import { ProtectedRoute } from "./components/ProtectedRoute"


const App = () => {

  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/todo" element={<Todo />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  )
}
export default App;