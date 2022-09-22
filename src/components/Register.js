import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from './Context';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDeferredValue } from "react";
import toast from "react-hot-toast";

const EMAIL_REGEX = /^\S+@\S+$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "https://todoo.5xcamp.us/users";

const Register = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [user, setUser] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidUser(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [email, user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(REGISTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          email: email,
          nickname: user,
          password: pwd
        }
      })
    })
      .then(response => {
        if (!response.ok) {
          setErrMsg(response.json())
          return;
        }
        setToken(response.headers.get('authorization'));
        //navigate("/todo");
      }).catch(error => console.log(error))
  }

  return (
    <main className="signUpPage bg-half">
      <nav>
        <h1>
          <Link to="/">ONLINE TODO LIST</Link>
        </h1>
      </nav>
      <form className="formControls" onSubmit={handleSubmit}>
        <h2 className="formControls_txt">
          <FontAwesomeIcon icon={["fa", "address-card"]} />
          Register
        </h2>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <label className="formControls_label" htmlFor="email">
          <FontAwesomeIcon icon={["fa", "envelope"]} />
          Email
          <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
        </label>
        <input
          ref={emailRef}
          className="formControls_input"
          type="email"
          placeholder="email"
          id="email"
          autoComplete="false"
          value={email}
          aria-describedby="emailnote"
          aria-invalid={validEmail ? true : false}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailFocus(false)}
          onFocus={() => setEmailFocus(true)}
        />
        <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          Please use valid email address.<br />
        </p>
        <label className="formControls_label" htmlFor="name">
          <FontAwesomeIcon icon={["fa", "user"]} />
          User Name
          <FontAwesomeIcon icon={faCheck} className={validUser ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validUser || !user ? "hide" : "invalid"} />
        </label>
        <input
          className="formControls_input"
          type="text"
          placeholder="name"
          id="name"
          value={user}
          aria-describedby="namenote"
          aria-invalid={validUser ? true : false}
          onChange={(e) => setUser(e.target.value)}
          onBlur={() => setUserFocus(false)}
          onFocus={() => setUserFocus(true)}
        />
        <p id="namenote" className={userFocus && user && !validUser ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters.<br />
          Must begin with a letter.<br />
          Letters, numbers, underscores, hyphens allowed.
        </p>
        <label className="formControls_label" htmlFor="pwd">
          <FontAwesomeIcon icon={["fa", "key"]} />
          Password
          <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
        </label>
        <input
          className="formControls_input"
          type="password"
          placeholder="password"
          id="pwd"
          value={pwd}
          aria-describedby="pwdnote"
          aria-invalid={validPwd ? true : false}
          onChange={(e) => setPwd(e.target.value)}
          onBlur={() => setPwdFocus(false)}
          onFocus={() => setPwdFocus(true)}
        />
        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters.<br />
          Must include uppercase and lowercase letters, a number and a special character.<br />
          Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
        </p>
        <label className="formControls_label" htmlFor="confirm_pwd">
          <FontAwesomeIcon icon={["fa", "key"]} />
          Confirm Password
          <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
        </label>
        <input
          className="formControls_input"
          type="password"
          placeholder="re-enter password"
          id="confirm_pwd"
          value={matchPwd}
          aria-describedby="confirmnote"
          aria-invalid={validMatch ? true : false}
          onChange={(e) => setMatchPwd(e.target.value)}
          onBlur={() => setMatchFocus(false)}
          onFocus={() => setMatchFocus(true)}
        />
        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the password input field.
        </p>
        <button disabled={!validEmail || !validUser || !validPwd || !validMatch ? true : false}>
          Register
        </button>
        <p>
          <br />
          Already registered?<br />
          <span className="line">
            <Link to="login">Sign In</Link>
          </span>
        </p>
      </form>
    </main>
  );
};

export default Register;
