import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios";

import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { GoPaperAirplane } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { useLocation } from 'react-router-dom';
import { MessageBlock } from "../../components/ComponentsMessageBlock";
import{  useState } from 'react';

import { Chat } from "../../components/ComponentChat";
import './chats.css'
export const Chats = () => {
    const url = "messagecenter-9p86.onrender.com"
    let location = useLocation();
    const token = location.state.token

    const acc_list = [
        {
            id: 1,
            name: "АБ",
        },
        {
            id: 2,
            name: "ВГ"
        },
        {
            id: 3,
            name: "ДЕ"
        }
    ]
    const chat_list = [
        {
            id: 14,
            color: "red",
            user_name: "Николай Убунта",
            product: "Ядро UniLix",
            last_message: "Я у вас приобрел 124 'копий херувимы-2' ",
            checked: false,
            date: "24.12.2012",
            amount_message: 21,
        },
        {
            id: 23,
            color: "green",
            user_name: "Семен Никулин",
            product: "Система МАС ОС",
            last_message: "Много ли тех кто бхает мас для игр?' ",
            checked: true,
            date: "21.12.2012",
            amount_message: 1,
        },
        {
            id: 1 ,
            color: "green",
            user_name: "Иван Петров",
            product: "Умные часы",
            last_message: "Какие функции важнее всего для вас в умных часах?",
            checked: true,
            date: "10.01.2022",
            amount_message: 3,
            },
            {
            id: 2 ,
            color: null,
            user_name: "Анна Иванова",
            product: "Фитнес браслет",
            last_message: "Какой бренд фитнес браслета вы рекомендуете?",
            checked: true,
            date: "15.02.2022",
            amount_message: 0,
            },
            {
            id: 3,
            color: "red",
            user_name: "Мария Сидорова",
            product: "Гейминг монитор",
            last_message: "Какой размер экрана лучше выбрать для гейминга?",
            checked: true,
            date: "05.03.2022",
            amount_message: 2,
            },
            {
            id: 4 ,
            color: null,
            user_name: "Дмитрий Козлов",
            product: "Фотоаппарат",
            last_message: "Какие параметры важны при выборе фотоаппарата?",
            checked: false,
            date: "18.04.2022",
            amount_message: 0,
            },
            {
            id: 5 ,
            color: "gray",
            user_name: "Ольга Николаева",
            product: "Смартфон",
            last_message: "Какая операционная система вам больше нравится?",
            checked: true,
            date: "30.05.2022",
            amount_message: 1,
            },
            {
            id: 6 ,
            color: null,
            user_name: "Алексей Игнатьев",
            product: "Наушники",
            last_message: "Какой тип наушников предпочтительнее для занятий спортом?",
            checked: true,
            date: "12.06.2022",
            amount_message: 1,
            },
            {
            id: 7 ,
            color: null,
            user_name: "Екатерина Павлова",
            product: "Видеокамера",
            last_message: "Как выбрать качественную видеокамеру для съемки видеоблога?",
            checked: true,
            date: "24.07.2022",
            amount_message: 0,
            },
            {
            id: 8 ,
            color: null,
            user_name: "Артем Федоров",
            product: "Игровая консоль",
            last_message: "Какую игровую консоль выбрать для игр с друзьями?",
            checked: true,
            date: "06.08.2022",
            amount_message: 2,
            },
            {
            id: 9 ,
            color: "blue",
            user_name: "София Кузнецова",
            product: "Планшет",
            last_message: "Какой планшет лучше всего подходит для работы и учебы?",
            checked: false,
            date: "19.09.2022",
            amount_message: 0,
            },
            {
            id: 10 ,
            color: "gray",
            user_name: "Никита Шевцов",
            product: "Ноутбук",
            last_message: "Какой ноутбук выбрать для работы с графикой?",
            checked: true,
            date: "01.10.2022",
            amount_message: 1,
            }

    ]

    const auth_token = `Bearer ${token}`

    const headers_auth = {
        headers: {
            'accept': 'application/json',
            'Authorization': auth_token,
            'Content-Type': 'application/json',
        }
    }

    // axios.get(`https://${url}/avito_chats/get_hints`, headers_auth)
    // .then(res => {
    //     console.log(res.data)
    // })
    // .catch(err => {
    //     console.log(err)
    // })

    const [searchInput, setSearchInput] = useState('');
    
    const handleSearch = (e) => {
        setSearchInput(e.target.value);
    }

    const RenderFilteredChatList = chat_list.filter((item) => {
        return item.user_name.toLowerCase().includes(searchInput.toLowerCase()) || item.product.toLowerCase().includes(searchInput.toLowerCase());
    });


    
    
    // const post_header = {
    //     headers: {
    //         'accept': 'application/json',
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'access_token': token
    //     }
    // }
    // axios.get(`https://${url}/avito_chats/get_chats`,post_header)
    // .then(res => {
    //     console.log(res)
    // })
    // .catch(err => {
    //     console.log(err)
    // })
    const qw = (id, name) => {
        console.log(id, name)
    }

    const renderAcc = () => {
        
        return acc_list.map(acc => (
            <div  key={acc.id} className="Account" data-index={acc.id}>{acc.name}</div>
        ));
    }


    const renderChat = () => {
        // return chat_list.map(chat => (
        //     <Chat 
        //     key={chat.id}
        //         id={chat.id}
        //         color={chat.color} 
        //         userName={chat.user_name} 
        //         product={chat.product}
        //         lastMessage={chat.last_message}
        //         checkedInfo={chat.checked}
        //         dateText={chat.date}
        //         amountMessage={chat.amount_message}
        //     />
        // ))
    }


    
    // console.log(token)
    // axios.get(`https:${url}/avito_accounts/register_account`, {
    //     profile_id:159470220,
    //     client_id:'Pm4BmvaY4LPFHQ6Oo_Hu',
    //     client_secret:'qBO1H1ssvcfotR15Nw1Qpxrs_1yG9vyhWb9tbgj5',
    //     proxy:'None',
    //     name:'first'
    //     }, {headers:{
    //     "access_token": token
    //         }
    //     })
    //     .then(res => {
    //         console.log(res.data)
    //     })
    //     .catch(err => {
    //         console.log("as ",err)
    //     })
    // axios.get(`https://${url}/avito_chats/get_chats`, {
    //     "access_token": token
    // })
    // .then(res => {
    //     console.log(res.data)
    // })
    // .catch(err => {
    //     console.log(err)
    // })

    return(
        
        <div className="wrapper">
            
            <div className="MainSideBar">
                <div className="OptionsPanel">
                    <div className="ColorFolders">

                        <div className="circle" id="blue"/>
                        <div className="circle" id="yellow"/>
                        <div className="circle" id="gray"/>
                        <div className="circle" id="green"/>
                        <div className="circle" id="red"/>

                    </div>

                    <div className="Accounts">
                        <div className="AccountsList">
                            <div className="List">

                                <div className="dotBlock" onClick={() => {console.log("tap")}}>
                                    <PiDotsThreeOutlineLight className="dot"  size={32} />  
                                </div>
                                
                                {
                                    renderAcc()
                                }

                            </div>
   
                        </div>
                    </div>
                </div>



                <div className="ChatsBlock">


                    <div className="SearchBlock">

                        <div className="InputBlock">

                            <div className="IconSearch pointer" >
                                <CiSearch size={40} />
                            </div>
                            <input className="InputSeacrch" placeholder="Поиск ..." onChange={handleSearch}>

                            </input>

                        </div>
                        {/* <GoPaperAirplane className="IconSend" size={32}/> */}
                        <PiDotsThreeOutlineLight className="Dots" size={32} />  



                    </div>



                    <div className="scrollbox">

                        <div className="scrollbox-inner">
                            {
                            RenderFilteredChatList.map((item) => (
                                <Chat 
                                onClick={qw(item.id, item.user_name)}
                                    key={item.id}
                                    id={item.id}
                                    color={item.color}
                                    userName={item.user_name}
                                    product={item.product}
                                    lastMessage={item.last_message}
                                    checkedInfo={item.checked}
                                    dateText={item.date}
                                    amountMessage={item.amount_message}
                                />
                            ))
                            }
                        </div>

                    </div>

                   
                </div>


            </div>

            {/*  */}
            <MessageBlock
                chatName="qwcibqc"
                ChatNamePtoduct="av asc"
            />

        </div>

    )
}