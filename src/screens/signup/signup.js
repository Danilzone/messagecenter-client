import axios from 'axios';
import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom"

import PacmanLoader from 'react-spinners/PacmanLoader';
import RingLoader from 'react-spinners/RingLoader';

import '../signin/signin.css' 
export const Signup = () => {
    const navigation = useNavigate(); // получаем history

    const url = "messagecenter-9p86.onrender.com"

    const [password, setPassword] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [email, setEmail] = useState('');

    const [loading, setLoading] = useState(false)
    const [loadingTwo, setLoadingTwo] = useState(false)
    
    const inputEmail = (e) => {
        setEmail(e.target.value);
    };
    const inputPassword = (e) => {
        setPassword(e.target.value);
    };
    const inputPasswordTwo = (e) => {
        setPasswordTwo(e.target.value);
    };
    

    const registration = () => {
        if (!email || !password || !passwordTwo) {
            alert("Вы не ввели данные")
        }  else {

            if (password === passwordTwo) {
                setLoading(true)
                const post_data = {
                    email: email,
                    password: password,
    
                }


                axios.post(`https://${url}/auth/register`, post_data)
                .then(res => {
                    console.log("зарегали")
                    
                    setLoadingTwo(true)
                    const login_data = {
                        username: email,
                        password: password
                    }            
                    const login_headers  = {
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded',
                        }
                    }

                    axios.post(`https://${url}/auth/jwt/login`, login_data, login_headers)
                    .then(res => {
                        
                        console.log("Вошел")
                        navigation("/chats", {state: {token: res.data.access_token }})

                    })
                    .catch(err => {
                        console.log(err)
                    })
                    .finally(() => {
                        setLoadingTwo(false)
                    })

                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
                    setLoading(false)
                 });

            } else {
                alert("Пароли не совпали")
            }

        }
    }

    return(
        <div className="wrapper">

            {loading && 
                <div className='loading'>
                    <PacmanLoader color="#d6d536" />
                    <h2 className='loadtext'>Регестрируем тебя</h2>
                </div>
            }

            {loadingTwo && 
                <div className='loading'>
                    <RingLoader color="#d6d536" />
                    <h2 className='loadtext'>Подтверждаем тебя</h2>
                </div>
            }

            <div className="form">


                <div className="idata">

                    <input type="text"
                            placeholder="email"
                            value={email}
                            onChange={inputEmail}
                    />

                    <input type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={inputPassword}
                    />

                    <input type="password"
                            placeholder="Подтвердите пароль"
                            value={passwordTwo}
                            onChange={inputPasswordTwo}
                    />

                </div>

                <div className='btn' onClick={registration} >Далее</div>
                <NavLink className="textBtn" to='/'>Вход</NavLink>
            </div>

        </div>


    )

}