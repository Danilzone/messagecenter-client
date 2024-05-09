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

    const [openChat, setOpenChat] = useState(null)

    const openChatHandler = (id, userName, product) => {
        setOpenChat({ id, userName, product });
    }
    
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

    ]

    const auth_token = `Bearer ${token}`

    const headers_auth = {
        headers: {
            'accept': 'application/json',
            'Authorization': auth_token,
            'Content-Type': 'application/json',
        }
    }



    const [searchInput, setSearchInput] = useState('');
    
    const handleSearch = (e) => {
        setSearchInput(e.target.value);
    }

    const RenderFilteredChatList = chat_list.filter((item) => {
        return item.user_name.toLowerCase().includes(searchInput.toLowerCase()) || item.product.toLowerCase().includes(searchInput.toLowerCase());
    });


    const handleColorClick = (color, id) => {
        const chatItem = chat_list.find((item) => item.id == id);
        console.log(chatItem)
        chatItem.color = color
       
    }
    
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
                        <PiDotsThreeOutlineLight className="Dots" size={32} />  



                    </div>



                    <div className="scrollbox">

                        <div className="scrollbox-inner">
                            {
                                RenderFilteredChatList.map((item) => (
                                    <div key={item.id} className="ChatBlock" onClick={() => {
                                        console.log(item.color)
                                           openChatHandler(item.id,item.user_name, item.product)
                                        }}>
                                        <Chat 
                                            id={item.id}
                                            color={item.color}
                                            userName={item.user_name}
                                            product={item.product}
                                            lastMessage={item.last_message}
                                            checkedInfo={item.checked}
                                            dateText={item.date}
                                            amountMessage={item.amount_message}
                                        />
                                    </div>
                                ))
                            }
                        </div>

                    </div>

                   
                </div>


            </div>

            
            {
                openChat && (
                    <MessageBlock id={openChat.id} chatName={openChat.userName} product={openChat.product} onClickColor={handleColorClick} />
                )
            }

        </div>

    )
}