import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <main className='loginPage bg-half'>
            <nav>
                <h1><Link to="/">ONLINE TODO LIST</Link></h1>
            </nav>
            <form className='formControls'>
                <h2 className='formControls_txt'><FontAwesomeIcon icon={['fa', 'address-card']} />登入</h2>
                <label className='formControls_label' htmlFor="email"><FontAwesomeIcon icon={['fa', 'fa-envelope']} />Email</label>
                <input className='formControls_input' type="text" placeholder="email"
                    {...register("email",
                        {
                            required: {
                                value: true,
                                message: '請輸入資料內容!'
                            },
                            pattern: {
                                value: /^\S+@\S+$/,
                                message: "格式有誤!"
                            }
                        }
                    )} />
                <p>{errors.email?.message}</p>
                <label className='formControls_label' htmlFor="pwd"><FontAwesomeIcon icon={['fa', 'key']} />密碼</label>
                <input className='formControls_input' type="password" placeholder="password"
                    {...register("password",
                        {
                            required: {
                                value: true,
                                message: '請輸入資料內容!'
                            },
                            minLength: {
                                value: 6,
                                message: "密碼長度至少6位字元"
                            }
                        }
                    )} />
                <p>{errors.password?.message}</p>
                <input className='formControls_btnSubmit' type="submit" value="登入" />
                <br />
            </form>
        </main>
    )
}

export default Login