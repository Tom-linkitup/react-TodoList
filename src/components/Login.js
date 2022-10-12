import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from './Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import toast, { Toaster } from "react-hot-toast";

const LOGIN_URL = "https://todoo.5xcamp.us/users/sign_in";
const Login = () => {

    const userRef = useRef();
    const errorRef = useRef();

    const { token, setToken } = useAuth();
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = JSON.stringify({
            user: {
                email: user,
                password: pwd
            }
        })
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        }
        const res = await fetch(LOGIN_URL, requestOptions).catch(error => toast.error(error));
        const resJson = await res.json();

        if (!res.ok) {
            toast.error(resJson.message);
            return;
        }
        setToken(res.headers.get('Authorization'));
        toast.success(resJson.message);
        navigate("/todo");
    }

    return (
        <main className='mainPage bg-half'>
            <div><Toaster /></div>
            <nav>
                <h1><Link to="/">ONLINE TODO LIST</Link></h1>
            </nav>
            <form className='formControls' onSubmit={handleSubmit}>
                <h2 className='formControls_txt'><FontAwesomeIcon icon={['fa', 'address-card']} />Sign In</h2>
                <label className='formControls_label' htmlFor="user"><FontAwesomeIcon icon={['fa', 'fa-envelope']} />Email</label>
                <input
                    ref={userRef}
                    id="user"
                    className='formControls_input'
                    type="text"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    placeholder="email" />
                <label className='formControls_label' htmlFor="pwd"><FontAwesomeIcon icon={['fa', 'key']} />Password</label>
                <input
                    className='formControls_input'
                    id="pwd"
                    type="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    placeholder="password" />
                <button className='formControls_btnLink'>Sign In</button>
                <br />
                <p>
                    <br />
                    Not registered?<br />
                    <span className="line">
                        <Link to="/register">Register</Link>
                    </span>
                </p>
            </form>
        </main>
    )
}

export default Login