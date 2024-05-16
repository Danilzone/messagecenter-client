import axios from 'axios';
import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import PacmanLoader from 'react-spinners/PacmanLoader';
import RingLoader from 'react-spinners/RingLoader';
import '../signin/signin.css' 
import '../signin/adapt.css'


export const NewAccAvito = () => {
    const navigation = useNavigate(); // получаем history
    let location = useLocation();
    const token = location.state.token
    const url = "185.41.160.212:8000"
    console.log(token)
    const [idProfile, setIdProfile] = useState('');
    const [idClient, setIdClient] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [accName, setAccName] = useState('');
    const headers = {
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    }


    const [loading, setLoading] = useState(false)
    const [loadingTwo, setLoadingTwo] = useState(false)
    
    const inputIdProfile = (e) => {
        setIdProfile(e.target.value);
    };
    const inputIdClient = (e) => {
        setIdClient(e.target.value);
    };
    const inputSecretKey = (e) => {
        setSecretKey(e.target.value);
    };
    const inputAccName = (e) => {
        setAccName(e.target.value);
    };
    

    const registration = () => {
        setLoading(true)
        axios.post(`https://${url}/avito_accounts/register_account`, {
            profile_id: idProfile,
            client_id: idClient,
            client_secret: secretKey,
            account_name: accName
        }, headers)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
            alert("Аккаунт успешно добавлен!")
        })
        .finally(() => {
            setLoading(false)
        })

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

                <h2>Привязка аккаунта Avito</h2>

                <div className="idata">

                    <input type="text"
                            placeholder="ID Профиля"
                            value={idProfile}
                            onChange={inputIdProfile}
                    />

                    <input type="text"
                            placeholder="ID Клиента"
                            value={idClient}
                            onChange={inputIdClient}
                    />

                    <input type="password"
                            placeholder="Секретный ключ"
                            value={secretKey}
                            onChange={inputSecretKey}
                    />

                    <input type="text"
                            placeholder="Название Аккаунта"
                            value={accName}
                            onChange={inputAccName}
                    />

                </div>
                <div className='btn' onClick={registration} >Зарегистрировать</div>
                <div className="textBtn pointer" onClick={() => {navigation("/chats",  {state: {token: token }})}}>Назад</div>
            </div>

        </div>


    )

}