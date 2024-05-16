import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios";

import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { GoPaperAirplane } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { useLocation } from 'react-router-dom';
import { MessageBlock } from "../../components/ComponentsMessageBlock";
import{  useEffect, useState } from 'react';
import { BiHome } from "react-icons/bi";
import { Chat } from "../../components/ComponentChat";
import { LuPlus } from "react-icons/lu";
import PacmanLoader from 'react-spinners/PacmanLoader';

import './chats.css'
import './adapt.css'

export const Chats = () => {
    const url = "185.41.160.212:8000"
    
    let location = useLocation();
    const token = location.state.token
    const email = location.state.email
    const navigation = useNavigate();
    
    const [loading, setLoading] = useState(false)
    const [openChat, setOpenChat] = useState(null)
    const [settingAcc, setSettingAcc] = useState(false)
    const [saveChat, setSaveChat] = useState([])
    const [accElements, setAccElements] = useState([]);
    
    const [chat, setChat] = useState([])

    const [searchInput, setSearchInput] = useState('');
    const header_get_acc_avito = {
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    }


    useEffect(() => {
        setLoading(true)
        renderChat()
        let socket = new WebSocket(`ws://${url}/avito_webhook/ws`)
        socket.onopen = function(e) {
            socket.send(email)
            console.log("Отправка на сервер", e);
        };
        socket.onmessage = function(event) {
         console.log(`Data:: `, event.data);
         if(event.data[0] == "{"){
             console.log(JSON.parse(event.data))
         }

        };
        socket.onclose = function(event) {
            if (event.wasClean) {
                console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            } else {
                console.log('[close] Connection died');
            }
        };
        socket.onerror = function(error) {
            console.log(`[error]`);
        };

    
        axios.get(`https://${url}/avito_accounts/get_accounts`, header_get_acc_avito)
            .then(res => {
                const acc_data = res.data;
                const newAccElements = [];

                for (const acc in acc_data) {
                    const acc_other_data = acc_data[acc];
                    const acc_name = acc;
                    const acc_profile_id = acc_other_data.profile_id;
                    const acc_client_id = acc_other_data.client_id;
                    const acc_client_secret = acc_other_data.client_secret;

                    newAccElements.push(
                        {
                        acc_name: acc_name,
                        acc_profile_id: acc_profile_id,
                        acc_client_id: acc_client_id,
                        acc_client_secreсt: acc_client_secret,
                    }
                );
                }

                setAccElements(newAccElements);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false)
            })
    }, []); 

    const auth_token = `Bearer ${token}`
    

    const headers_auth = {
        headers: {
            'accept': 'application/json',
            'Authorization': auth_token,
            'Content-Type': 'application/json',
        }
    }

    
    const handleSearch = (e) => {
        setSearchInput(e.target.value);
        }

    const gotoNewAccAvito = () => {
        navigation("/newaccavito",  {state: {token: token }})
    } 
    
    const full_chat_list = []
    const renderChat = () => {
        axios.get(`https://${url}/avito_chats/get_chats`, headers_auth)
        .then(res => {
  

          const all_chat = res.data
        
        for(const chat in all_chat) {
            const acc_chats = all_chat[chat]
            
            for(const chat in acc_chats ) {
              const list_chat =  acc_chats[chat]
              
              const account_name_chat_list = chat

            
              for(const con_chat in list_chat) {
                const dif_chat =  list_chat[con_chat]

                    for(const dif_chat_info in dif_chat) {
                        const chat_data = dif_chat[dif_chat_info]
                        const chat_id = dif_chat_info
                        const chat_title = chat_data.title
                        const chat_last_message = chat_data.last_message
                        const chat_color = chat_data.color
                        const chat_deleted = chat_data.deleted

                        const last_message_author_id = chat_last_message.author_id
                        const last_message_content = chat_last_message.content.text
                        const last_message_created = chat_last_message.created
                        const last_message_direction = chat_last_message.direction
                        const last_message_isRead = chat_last_message.isRead
                        const n_data = new Date(last_message_created);

                        full_chat_list.push(
                            {
                                id: chat_id,
                                title: chat_title,
                                last_message: last_message_content,
                                color: chat_color, 
                                message_author_id: last_message_author_id,
                                date: n_data,
                                direction: last_message_direction,
                                isRead: last_message_isRead,
                                acc_name: account_name_chat_list
                            } 
                        )
                        setChat(full_chat_list);
                        setSaveChat(full_chat_list)
                }
              }
              
            }
        }
        })
        .catch(err =>{
            console.log(err)
        })
        .finally(() => {
            console.log("Запрос получение чатов выполнился")
        })
    }

    const RenderFilteredChatList = chat.filter((item) => {
        return item.acc_name.toLowerCase().includes(searchInput.toLowerCase()) || item.title.toLowerCase().includes(searchInput.toLowerCase());
    });
 

    const handleColorClick = (color, id, user_name) => {
        console.log(`Id: ${color}`)
        setLoading(true)
        axios.post(`https://${url}/avito_chats/set_color?chat_id=${id}&color=${color}`, {chat_id: id, color: color}, headers_auth)
        .then(res => {
            console.log("Добавлен цвет")
            setChat(prevChat => 
                prevChat.map(chatItem =>
                    chatItem.id === id ? {...chatItem, color: color} : chatItem
                )
            )
        })
        .catch(err => {
            console.log(err)
        })
        .finally(() => {
            setLoading(false)
        })
    }
    
    const mobileClickBack = () => {
        setOpenChat(null)
    }


    const openChatHandler = (id, userName, product) => {
        
        if(settingAcc) {
            console.log("Выбран", userName)            
        } else {
            setLoading(true)    
            axios.post(`https://${url}/avito_chats/get_chat?chat_id=${id}&account_name=${userName}`, {chat_id: id, account_name: userName}, headers_auth)
            .then(res => {                  
                setOpenChat({ id: id, userName: userName , product: product, messages: res.data});
            })
            .catch(err => {
                console.log("msgs: ", err)
            })
            .finally(() => {setLoading(false)})
        }
            
    }
    
    

   


    const getMessages = (id, userName, product) => {
        setOpenChat({ 
            id: id,
            userName: userName,
            product: product,
        });
    }



    const settingAccountList = () => {
        setSettingAcc(!settingAcc)
    }

    const filterColor = (color) => {
        console.log(chat)
        if(color == "default") {
            setChat([]);
            setChat(saveChat);
            console.log(chat)
        } else {
            setChat([]);
            const filteredChats = saveChat.filter(chat => chat.color == color);
            console.log(color, filteredChats);
            setChat(filteredChats);
        }
    }

    const filterChat = (id, name) => {
        console.log("id: ", id , "\nname: ", name)
    } 
    
    return(
        
        <div className="wrapper">
            {loading && 

                <div className='loading'>
                    <PacmanLoader color="#d6d536" />
                    <h2 className='loadtext'>В процессее</h2>
                </div>

            }
            <div className="MainSideBar">
                <div className="OptionsPanel">
                    <div className="ColorFolders">

                        <div className="circle" id="blue"   onClick={() => {filterColor("blue")}} >  { settingAcc ? <LuPlus color="#fff" size={24} className="pointer" /> : ""} </div>
                        <div className="circle" id="yellow" onClick={() => {filterColor("yellow")}}>{ settingAcc ? <LuPlus color="#fff" size={24} className="pointer" /> : ""} </div>
                        <div className="circle" id="gray"   onClick={() => {filterColor("gray")}}>  { settingAcc ? <LuPlus color="#fff" size={24} className="pointer" /> : ""} </div>
                        <div className="circle" id="green"  onClick={() => {filterColor("green")}}> { settingAcc ? <LuPlus color="#fff" size={24} className="pointer" /> : ""} </div>
                        <div className="circle" id="red"    onClick={() => {filterColor("red")}}>   { settingAcc ? <LuPlus color="#fff" size={24} className="pointer" /> : ""} </div>

                    </div>

                    <div className="Accounts">
                            
                            <div className="AccOption" onClick={() => {filterColor("default")}} >
                                <BiHome size={24} />
                            </div>
                            
                            <div className="AccOption" onClick={gotoNewAccAvito} >
                                <LuPlus color="#000" size={24} />
                            </div>

                        <div className="AccountsList">
                            <div className="List">

                                
                                {accElements.map(acc =>

                                (
                                    <div key={acc.acc_profile_id} className="Account" data-index={acc.acc_profile_id} onClick={() => filterChat(acc.acc_profile_id, acc.acc_name)}>
                                        {acc.acc_name.slice(0, 2)}
                                    </div>
                                ))}

                            </div>

                        </div>
                    </div>

                </div>



                <div className="ChatsBlock">

                    <div className="Search">
                                <div className="InputBlock">

                                    <div className="IconSearch pointer" >
                                        <CiSearch size={40} />
                                    </div>

                                    <input className="InputSearch" placeholder="Поиск ..." onChange={handleSearch}>

                                    </input>

                                </div>
                        <PiDotsThreeOutlineLight className="Dots" size={42} onClick={settingAccountList} />   

                    </div>



                    <div className="scrollbox">
                    <div className="TopColorMobilePanel">
                        <div className="elipsMob" id="blue">  { settingAcc ? <LuPlus color="#fff" size={18} className="pointer" /> : ""} </div>
                        <div className="elipsMob" id="yellow">{ settingAcc ? <LuPlus color="#fff" size={18} className="pointer" /> : ""} </div>
                        <div className="elipsMob" id="gray">  { settingAcc ? <LuPlus color="#fff" size={18} className="pointer" /> : ""} </div>
                        <div className="elipsMob" id="green"> { settingAcc ? <LuPlus color="#fff" size={18} className="pointer" /> : ""} </div>
                        <div className="elipsMob" id="red">   { settingAcc ? <LuPlus color="#fff" size={18} className="pointer" /> : ""} </div>

                    </div>
                    <div className="BottomMobilePanel">
                        <div className="AccOption" >
                            <BiHome size={48} />
                        </div>
                                


                         <div className="AccountsList">
                             <div className="List">
                                 
                                 {accElements.map(acc =>
                                 (
                                     <div key={acc.acc_profile_id} className="Account" data-index={acc.acc_profile_id} >
                                         {acc.acc_name.slice(0, 2)}
                                     </div>
                                 ))}
                             </div>
                         </div>
                         
                         <div className="AccOption" onClick={gotoNewAccAvito} >
                            <LuPlus color="#000" size={48} />
                        </div>
                    </div>
                        <div className="scrollbox-inner">
                            {

                            RenderFilteredChatList.map(item_chat => (
                                <div  className="ChatBlock" onClick={() => {
                                    openChatHandler(item_chat.id, item_chat.acc_name, item_chat.title);
                                }} >
                                    <Chat 
                                        key={item_chat.id}
                                        id={item_chat.id}
                                        color={item_chat.color}
                                        userName={item_chat.acc_name}
                                        product={item_chat.title}
                                        lastMessage={item_chat.last_message}
                                        checkedInfo={item_chat.isRead}
                                        // dateText={item_chat.date.toLocaleTimeString()}
                                        dateText="12:13:13"
                                        amountMessage="0"
                                        settingAcc={settingAcc}
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

                    <MessageBlock 
                        id={openChat.id} 
                        chatName={openChat.userName} 
                        product={openChat.product} 
                        onClickColor={handleColorClick} 
                        onClickBack={mobileClickBack}
                        settingAcc={settingAcc}
                        messages={openChat.messages}
                    />
                )
            }

        </div>

    )
}