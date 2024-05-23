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

import { MdOutlineCancel } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";

import './chats.css'
import './adapt.css'
import { LiaChessPawnSolid } from "react-icons/lia";

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
    
    const [editChat, setEditChat] = useState([])
    const [confirmColor, setConfirmColor] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)

    const [chat, setChat] = useState([  
    // {
    //     id: "u23r2",
    //     title:"Название товара",
    //     last_message: "Ласт сообщение",
    //     color: "green", 
    //     message_author_id: "1124124",
    //     date: 1717812214,
    //     direction: "out",
    //     isRead: false,
    //     chat_name: "Игорь Григорьев Игоревич"
    // },
    // {
    //     id: "u23r23",
    //     title:"Иванов Иван Иванович",
    //     last_message: "Ласт сообщение, ну как бы вот так. Многа текстаааа",
    //     color: "green", 
    //     message_author_id: "12313113",
    //     date: 1717812214,
    //     direction: "in",
    //     isRead: false,
    //     chat_name: "HER"
    // },
 ])

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
            // console.log(`Data:: `, event.data);
            if(event.data[0] == "{"){
                const data_chats_ws = JSON.parse(event.data);
                setWsTest(data_chats_ws)
                if(data_chats_ws && data_chats_ws.payload && data_chats_ws.payload.value) {
                    const ws_chat_id = data_chats_ws.payload.value.chat_id;
                    const ws_message = data_chats_ws.payload.value.content.text;
        
                    // console.log(ws_chat_id, ws_message);
                    setChat(prevChat => 
                        prevChat.map(chatItem =>
                            chatItem.id === ws_chat_id ? {...chatItem, last_message: ws_message} : chatItem
                        )
                    )
                    // console.log(data_chats_ws.payload)
                }
            }
        }
        
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

    
        axios.get(`http://${url}/avito_accounts/get_accounts`, header_get_acc_avito)
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
                // newAccElements.push({
                //     acc_name: "HER",
                //     acc_profile_id: "1241242124124",
                //     acc_client_id: "31r312r2",
                //     acc_client_secreсt: "eqafg29ob3tr123t123t",
                // })
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
    
    const [wsTest, setWsTest] = useState()

    const full_chat_list = []
    const renderChat = () => {
        setLoading(true)
        axios.get(`http://${url}/avito_chats/get_chats`, headers_auth)
        .then(res => {
            console.log(res.data)
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
                        
                            const chat_user_name = chat_data.client_name
                            const last_message_author_id = chat_last_message.author_id
                            const last_message_content = chat_last_message.content.text
                            const last_message_created = chat_last_message.created
                            const last_message_direction = chat_last_message.direction
                            const last_message_isRead = chat_last_message.isRead
                           
                            full_chat_list.push(
                                {
                                    id: chat_id,
                                    title: chat_title,
                                    last_message: last_message_content,
                                    color: chat_color, 
                                    message_author_id: last_message_author_id,
                                    date: last_message_created,
                                    direction: last_message_direction,
                                    isRead: last_message_isRead,
                                    chat_name: chat_user_name,
                                    acc_avito_name: account_name_chat_list,

                                    thisSetting: false
                                }
                            )
                        }
                    }
                    
                }
                setChat(full_chat_list);
                setSaveChat(full_chat_list)
            }
        })
        .catch(err =>{
            console.log(err)
        })
        .finally(() => {
            setLoading(false)
            console.log("Запрос получение чатов выполнился")
        })
    }

    const RenderFilteredChatList = chat.filter((item) => {
        return item.chat_name.toLowerCase().includes(searchInput.toLowerCase()) || item.title.toLowerCase().includes(searchInput.toLowerCase());
    });
 

    const handleColorClick = (color, id, user_name) => {

        setLoading(true)
        axios.post(`http://${url}/avito_chats/set_colors?color=${color}`, {chats: [id]}, headers_auth)
        .then(res => {
            console.log("Добавлен цвет")
            renderChat()
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

  
    const openChatHandler = (id, userName, product, acc_avito_name) => {
        if (settingAcc) {
            
            setChat(prevChat =>
                prevChat.map(chatItem =>
                    chatItem.id === id ? {...chatItem, thisSetting: !chatItem.thisSetting } : chatItem
                )
            )
            const tChat =  chat.find(item => item.id === id)
            if (!tChat.thisSetting) {
                setEditChat(prevState => [...prevState, tChat]);
            } else {
                setEditChat(prevState => prevState.filter(item => item.id !== id));
            }
   
        } 
        else {
            setLoading(true)
            axios.post(`http://${url}/avito_chats/get_chat?chat_id=${id}&account_name=${acc_avito_name}`, {chat_id: id, account_name: acc_avito_name}, headers_auth)
            .then(res => {                  
                setOpenChat({ id: id, chatId: id, userName: userName , product: product, messages: res.data, acc_avito_name: acc_avito_name});
            })
            .catch(err => {
                console.log("msgs: ", err)
            })
            .finally(() => {setLoading(false)})
        }
            
    }




    const settingAccountList = () => {
        setSettingAcc(!settingAcc)
    }

    const [filterColorChat, setFilterColorChat ] = useState([])

    const [colorFolder, setColorFolder] = useState('')


    const filterColor = (color) => {
       if (settingAcc) {
            setColorFolder(color)
            colorChatsConfirm(true)
       } else {
            console.log(chat)
            if(color == "default") {
                setChat([]);
                setChat(saveChat);
            } else {
                setChat([]);
                const filteredChats = saveChat.filter(chat => chat.color == color);
                console.log(color, filteredChats);
                setChat(filteredChats);
                setFilterColorChat(filteredChats)
            }
       }
    }

    const filterChat = (id, name) => {        
        setLoading(true)
        axios.post(`http://${url}/avito_chats/filters/accounts?account=${name}`, {accounts: name} ,headers_auth)
        .then(res => {
            // console.log(res.data)
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
                        
                            const chat_user_name = chat_data.client_name
                            const last_message_author_id = chat_last_message.author_id
                            const last_message_content = chat_last_message.content.text
                            const last_message_created = chat_last_message.created
                            const last_message_direction = chat_last_message.direction
                            const last_message_isRead = chat_last_message.isRead
                           
                            full_chat_list.push(
                                {
                                    id: chat_id,
                                    title: chat_title,
                                    last_message: last_message_content,
                                    color: chat_color, 
                                    message_author_id: last_message_author_id,
                                    date: last_message_created,
                                    direction: last_message_direction,
                                    isRead: last_message_isRead,
                                    chat_name: chat_user_name,
                                    acc_avito_name: account_name_chat_list,

                                    thisSetting: false
                                }
                            )
                        }
                    }
                    
                }
                setChat(full_chat_list);
                setSaveChat(full_chat_list)
            }
        })
        .catch(err => {
            console.log(err)
        })
        .finally(() => {
            setLoading(false)
        })
        // const filterChatsAcc = saveChat.filter(chat => chat.chat_name == name )
        // setChat(filterChatsAcc)
        // console.log(filterColorChat)
    } 
    
    const deletChatsConfirm = () => {
        setConfirmDelete(true)
    }
    const colorChatsConfirm = () => {
        setConfirmColor(true)
    }

    return(
        
        <div className="wrapper">
            {loading && 

                <div className='loading'>
                    <PacmanLoader color="#d6d536" />
                    <h2 className='loadtext'>В процессее</h2>
                </div>

            }

            {confirmColor && 
                <div className="ConfirmBlock">
                    <div className="ConfirmMenu">
                        <div className="ConfirmMenuTextBlock">
                            Подтвердить выбор папки
                        </div>
                        <div className="ConfirmMenuBtns">

                            <div className="ConfirmBtn __Ok" onClick={() => {
                                 let list_chats_id = []
                                 let post_chats_id = []
                                 const chats_id = editChat.map(data => list_chats_id.push(data.id.toString()))
                                 list_chats_id.map(i => post_chats_id.push(i))
                                 setLoading(true)
                                 axios.post(`http://${url}/avito_chats/set_colors?color=${colorFolder}`, {chats: post_chats_id},  headers_auth)
                                 .then(res => {
                                     renderChat()
                                     // console.log(res.data)
                                 })
                                 .catch(err => {
                                     console.log(err)
                                 })
                                 .finally(() => {
                                    setLoading(false)
                                    setConfirmColor(false)
                                 })
                            }}>Подтвердить</div>
                            <div className="ConfirmBtn __Cancel" onClick={() => setConfirmColor(false)}>Отмена</div>

                        </div>
                    </div>
                </div>
            }

            {confirmDelete && 
                <div className="ConfirmBlock">
                    <div className="ConfirmMenu">
                        <div className="ConfirmMenuTextBlock">
                            Подтвердить удаление 
                        </div>
                        <div className="ConfirmMenuBtns">

                            <div className="ConfirmBtn __Ok" onClick={() => {
                                console.log("Удаление")
                            }}>Подтвердить</div>
                            <div className="ConfirmBtn __Cancel" onClick={() => setConfirmDelete(false)}>Отмена</div>

                        </div>
                    </div>
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
                    {
                        settingAcc && (
                            <div className="settingBlock">
                                
                                <div className="BtnCancel"> 
                                    <div className="BtnSett" onClick={() => {setSettingAcc(false)}} > <MdOutlineCancel size={24} color="#000" /> </div>
                                </div>

                                <div className="BtnDelete"> 
                                    <div className="BtnSett" onClick={deletChatsConfirm}> <IoTrashOutline size={24} color="#000" /> </div>
                                </div>
                            
                            </div>
                            ) 
                    }
                    <div className="Search">
                                <div className="InputBlock">

                                    <div className="IconSearch pointer" >
                                        <CiSearch size={26} />
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
                                    openChatHandler(item_chat.id, item_chat.chat_name, item_chat.title, item_chat.acc_avito_name);
                                }} >
                                    <Chat 
                                        key={item_chat.id}
                                        id={item_chat.id}
                                        color={item_chat.color}
                                        userName={item_chat.chat_name}
                                        product={item_chat.title}
                                        lastMessage={item_chat.last_message}
                                        checkedInfo={item_chat.isRead}
                                        dateText={item_chat.date}
                                        // dateText="19.05.2024"
                                        amountMessage="0"
                                        settingAcc={settingAcc}
                                        thisSetting={item_chat.thisSetting}
                                    />
                                </div>
                            ))
                            
                            }
                            {
                                settingAcc && (
                                    <div className="nullchat" />
                                )
                            }
                        </div>

                    </div>

                   
                </div>


            </div>

            
            {
                openChat && (

                    <MessageBlock 
                        id={openChat.id} 
                        chatId={openChat.chatId}
                        chatName={openChat.userName} 
                        product={openChat.product} 
                        onClickColor={handleColorClick} 
                        onClickBack={mobileClickBack}
                        settingAcc={settingAcc}
                        messages={openChat.messages}
                        token={auth_token}
                        acc_avito_name={openChat.acc_avito_name}
                        test={wsTest}
                        
                    />
                )
            }

   

        </div>

    )
}