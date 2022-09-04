import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm} from 'react-hook-form'

const Register = () => {

    const navigate = useNavigate();
    const { register, handleSubmit, watch , formState: { errors } } = useForm();

    return (
        <main className='signUpPage'>
            <form className='formControls'>
                <h2 className='formControls_txt'>註冊帳號</h2>
                <label className='formControls_label' htmlFor="email">Email</label>
                <input className='formControls_input' type="text" placeholder="請輸入 email"
                    {...register("email",
                        {
                            required: {
                                value: true,
                                message: '請輸入資料內容!'
                            },
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "格式有誤!"
                            }
                        }
                    )} />
                <p>{errors.email?.message}</p>
                <label className='formControls_label' htmlFor="name">您的暱稱</label>
                <input className='formControls_input' type="text" placeholder="Nickname"
                    {...register("nickname", {})} />
                <p>{errors.Nickname?.message}</p>
                <label className='formControls_label' htmlFor="pwd">密碼</label>
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
                <label className='formControls_label' htmlFor="pwd">再次輸入密碼</label>
                <input className='formControls_input' type="password" placeholder="password"
                    {...register("passwordConfirm",
                        {
                            required: {
                                value: true,
                                message: '請輸入資料內容!'
                            },
                            minLength: {
                                value: 6,
                                message: "密碼長度至少6位字元"
                            },validate: (val) => {
                                if (watch('password') !== val) {
                                  return "密碼不一致";
                                }
                              }
                        }
                    )} />
                <p>{errors.passwordConfirm?.message}</p>
                <input className='formControls_btnSubmit' type="submit" value="註冊帳號" />
                <br />
                <Link to="/">回首頁</Link>
            </form>
        </main>
    )
}

export default Register