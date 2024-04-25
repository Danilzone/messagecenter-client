import React, { useState } from 'react';
import { NavLink } from "react-router-dom"
import axios from "axios"
import './signin.css'

const url = "messagecenter-9p86.onrender.com"

export const Signin = () => {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    const inputPassword = (e) => {
        setPassword(e.target.value);
    };
    const inputEmail = (e) => {
        setEmail(e.target.value);
    };

    const goto = () => {
        // if (!password) {
            // alert("Вы не ввели пароль")
        // } else {

            const post_data = {                
                "email": "user2@example.com",
                "password": "string",
   
            }

            const post_headers = {
                cors: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type"
                  }
            }
            axios.post(`https://${url}/auth/register`, post_data, {
                withCredentials: true
              })
            .then(res => {
                console.log("Ответ от сервера")
                console.log(res.data)
            })
            .catch(err => {
                console.log("ERR > ", err.status, err)
            })

        // }
    }

    return(

        <div className="wrapper">

            <div className="form">


                <div className="idata">

                    <input  type="text"
                            placeholder="email"
                            value={email}
                            onChange={inputEmail}
                     />

                    <input  type="password"
                            placeholder="password"
                            value={password}
                            onChange={inputPassword}
                     />

                </div>

                {/* <NavLink className="btn" to='/chats'>Войти</NavLink> */}
                <div className='btn' onClick={goto}>Войти</div>
            </div>

        </div>

    )
}