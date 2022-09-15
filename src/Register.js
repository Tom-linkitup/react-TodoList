import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EMAIL_REGEX = /^\S+@\S+$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidName(USER_REGEX.test(user))
  }, [user])

  return (
    <main className="signUpPage bg-half">
      <nav>
        <h1>
          <Link to="/">ONLINE TODO LIST</Link>
        </h1>
      </nav>
      <form className="formControls" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="formControls_txt">
          <FontAwesomeIcon icon={["fa", "address-card"]} />
          註冊帳號
        </h2>
        <label className="formControls_label" htmlFor="email">
          Email
          <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
          <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
        </label>
        <input
          ref={emailRef}
          className="formControls_input"
          type="text"
          placeholder="email"
          id="email"
        />
        <label className="formControls_label" htmlFor="name">
          <FontAwesomeIcon icon={["fa", "user"]} />
          您的暱稱
        </label>
        <input
          className="formControls_input"
          type="text"
          placeholder="nickname"
        />
        <label className="formControls_label" htmlFor="pwd">
          <FontAwesomeIcon icon={["fa", "key"]} />
          密碼
        </label>
        <input
          className="formControls_input"
          type="password"
          placeholder="password"
          id="pwd"
        />
        <label className="formControls_label" htmlFor="confirm_pwd">
          <FontAwesomeIcon icon={["fa", "key"]} />
          再次輸入密碼
        </label>
        <input
          className="formControls_input"
          type="password"
          placeholder="re-enter password"
          id="confirm_pwd"
        />
        <button
          disabled={!validName || !validPwd || !validMatch ? true : false}>
          Sign Up
        </button>
        <br />
      </form>
    </main>
  );
};

export default Register;
