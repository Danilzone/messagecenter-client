import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom"

import axios from "axios"
import './signin.css'
import './adapt.css'


import PacmanLoader from 'react-spinners/PacmanLoader';


const url = "messagecenter-9p86.onrender.com"
// const url = "185.41.160.212:8000"

export const Signin = () => {
    const navigation = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [loading, setLoading] = useState(false)
    
    const inputPassword = (e) => {
        setPassword(e.target.value);
    };
    const inputEmail = (e) => {
        setEmail(e.target.value);
    };

    const goto = () => {

        if (!email || !password) {
            alert("Вы не ввели данные")
        } else {

            setLoading(true)

            const post_data = {
                username: email,
                password: password,
            }

            const post_headers  = {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }

            axios.post(`https://${url}/auth/jwt/login`, post_data, post_headers)
            .then(res => {

               const token = res.data.access_token

                navigation("/chats",  {state: {token: token, email: email }})
            })
            .catch(err => {
                console.log(err.response.status)
                
                if(err.response.status == 400) {
                    alert("Вы ввели не коректные данные")
                }
            })
            .finally(() => {
               setLoading(false)
            });
        }
    }


    return(

        <div className="wrapper">

            {loading && 

                <div className='loading'>
                    <PacmanLoader color="#d6d536" />
                    <h2 className='loadtext'>В процессее</h2>
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
                            placeholder="password"
                            value={password}
                            onChange={inputPassword}
                     />

                </div>

                <div className='btn' onClick={goto}>Войти</div>
                <NavLink className="textBtn" to='/signup'>Регистрация</NavLink>
            </div>

        </div>

    )
}