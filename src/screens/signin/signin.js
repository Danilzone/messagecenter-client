import React, { useState } from 'react';
import { NavLink } from "react-router-dom"
import axios from "axios"
import './signin.css'


import PacmanLoader from 'react-spinners/PacmanLoader';



const url = "messagecenter-9p86.onrender.com"

export const Signin = () => {

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

            axios.post(`https://${url}/auth/login`, post_data, post_headers)
            .then(res => {
                console.log(res.data)

               

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

    const test = (token) => {
            const post_data = {

            profile_id: 159470220,
            client_id: 'Pm4BmvaY4LPFHQ6Oo_Hu',
            client_secret: 'qBO1H1ssvcfotR15Nw1Qpxrs_1yG9vyhWb9tbgj5',
            proxy: 'None',
            name: 'first'

        }
        
        const post_headers  = {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Autarizations': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiOTIyMWZmYzktNjQwZi00MzcyLTg2ZDMtY2U2NDJjYmE1NjAzIiwiYXVkIjoiZmFzdGFwaS11c2VyczphdXRoIiwiZXhwIjoxNTcxNTA0MTkzfQ.M10bjOe45I5Ncu_uXvOmVV8QxnL-nZfcH96U90JaocI`
            }
        }

        console.log(post_headers.headers)

        axios.post(`https://${url}/add_account`, post_data, post_headers)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log("ERR: ", err)
        })

    }

    return(

        <div className="wrapper">

            {loading && 

                <div className='loading'>
                    <PacmanLoader color="#d6d536" />
                    <h2>В процессее</h2>
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

                {/* <NavLink className="btn" to='/chats'>Войти</NavLink> */}
                <div className='btn' onClick={goto}>Войти</div>
            </div>

        </div>

    )
}