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
    const url = "messagecenter-9p86.onrender.com"
    
    let location = useLocation();
    const token = location.state.token
    const email = location.state.email
    const navigation = useNavigate();

    const [loading, setLoading] = useState(false)
    const [openChat, setOpenChat] = useState(null)
    const [settingAcc, setSettingAcc] = useState(false)


   
    const header_get_acc_avito = {
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    }

    const [accElements, setAccElements] = useState([]);

    const [chat, setChat] = useState([])

    useEffect(() => {
        setLoading(true)
        renderChat()
        let socket = new WebSocket(`wss://${url}/avito_webhook/ws`)
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
                        acc_client_secret: acc_client_secret,
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



    const chat_list = []

    const auth_token = `Bearer ${token}`

    const headers_auth = {
        headers: {
            'accept': 'application/json',
            'Authorization': auth_token,
        }
    }


    const [searchInput, setSearchInput] = useState('');

    const handleSearch = (e) => {
        setSearchInput(e.target.value);
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
    const openChatHandler = (id, userName, product) => {
        
        if(settingAcc) {
            console.log("Выбран", userName)            
        } else {
            setLoading(true)    
            axios.post(`https://${url}/avito_chats/get_chat?chat_id=${id}&account_name=${userName}`, {chat_id: id, account_name: userName}, headers_auth)
            .then(res => {
                console.log("msgs: ", res.data)
                setOpenChat({ id: id, userName: userName , product: product, messages: res.data });
            })
            .catch(err => {
                console.log("msgs: ", err)
            })
            .finally(() => {setLoading(false)})
        }
            
    }
    const resdata ={"First":[{"u2u-ZvYIW8c5Fzps3~AAlgzZVw":{"title":"","last_message":{"id":"d0e771d37bf6cae0b0f390ab93f62140","author_id":301295896,"created":1715367780,"content":{"text":"."},"type":"text","direction":"in","isRead":false},"color":null,"deleted":false}},{"u2u-fUou7m2QprJtGcB9WIaSCw":{"title":"","last_message":{"id":"4c4bb9784a938757621e8c05d94cb5d2","author_id":267389958,"created":1715367385,"content":{"text":"Тест"},"type":"text","direction":"in","isRead":false},"color":null,"deleted":false}},{"u2i-Zucg11tKK3uNt~n99kfmZw":{"title":"Apple Watch HK9 Ultra 2 (серебристо-чёрный) А591","last_message":{"id":"121d62ce59699d38634a06bdeafad4de","author_id":159470220,"created":1713213695,"content":{"text":"Hello world"},"type":"text","direction":"out","isRead":true,"read":1713262434},"color":null,"deleted":false}},{"u2i-Y8cqQM9WS_zE3KdWIK5HyQ":{"title":"Acer aspire 3 a315, 16 DDR5, 512 SSD","last_message":{"id":"2ed94da7e4df29df3d1626b686e4d082","author_id":0,"created":1710757327,"content":{"text":"[Системное сообщение] 🖊 Оставьте отзыв о продавце.\n\n[Системное сообщение] Расскажите, как прошло общение, встреча или сделка — что понравилось, а что не очень.\n\nВы можете оценить, например:\n— скорость ответов,\n— детальность информации о товаре,\n— соответствие товара описанию."},"type":"system","direction":"in","isRead":true,"read":1711102794},"color":null,"deleted":false}},{"u2i-zbA98ddZDgkE5Mf0jEQ7zQ":{"title":"Ноутбук Honor MagicBook Pro","last_message":{"id":"15f1ef07f9446e547fd9ee9b0a35add9","author_id":0,"created":1710673626,"content":{"text":"[Системное сообщение] 🖊 Оставьте отзыв о продавце.\n\n[Системное сообщение] Расскажите, как прошло общение, встреча или сделка — что понравилось, а что не очень.\n\nВы можете оценить, например:\n— скорость ответов,\n— детальность информации о товаре,\n— соответствие товара описанию."},"type":"system","direction":"in","isRead":true,"read":1711102800},"color":null,"deleted":false}},{"u2i-5AWK3qT7QP_inILZo9hVTA":{"title":"16' Ryzen 7 5800H RX 5500m 144гц","last_message":{"id":"1661108cb76caa87fb9586b5af9673a2","author_id":0,"created":1710666574,"content":{"text":"[Системное сообщение] 🖊 Оставьте отзыв о продавце.\n\n[Системное сообщение] Расскажите, как прошло общение, встреча или сделка — что понравилось, а что не очень.\n\nВы можете оценить, например:\n— скорость ответов,\n— детальность информации о товаре,\n— соответствие товара описанию."},"type":"system","direction":"in","isRead":true,"read":1711102812},"color":null,"deleted":false}},{"u2i-y4HSOr2UnEOjKnp8Mt3mgQ":{"title":"Букет-гигант из хризантемы","last_message":{"id":"2469edd0f3a371dc4c4cf100915bca1f","author_id":0,"created":1710068602,"content":{"text":"[Системное сообщение] 🖊 Оставьте отзыв о продавце.\n\n[Системное сообщение] Расскажите, как прошло общение, встреча или сделка — что понравилось, а что не очень.\n\nВы можете оценить, например:\n— скорость ответов,\n— детальность информации о товаре,\n— соответствие товара описанию."},"type":"system","direction":"in","isRead":true,"read":1710073060},"color":null,"deleted":false}},{"u2i-D3M2eNfsUTOAlYgqtLVGGA":{"title":"Машинка для cтpижки king кp-2020 топ в 2024 А400","last_message":{"id":"12b5f266023adc6420be4347a0910255","author_id":159470220,"created":1709797852,"content":{"link":{"text":"https://www.avito.ru/moskva/bytovaya_tehnika/mashinka_dlya_ctpizhki_king_kp-2020_luchshiy_vybor_2024_3834188022?utm_campaign=native&utm_medium=item_page_android&utm_source=soc_sharing","url":"https://www.avito.ru/moskva/bytovaya_tehnika/mashinka_dlya_ctpizhki_king_kp-2020_luchshiy_vybor_2024_3834188022?utm_campaign=native&utm_medium=item_page_android&utm_source=soc_sharing","preview":{"url":"https://www.avito.ru/moskva/bytovaya_tehnika/mashinka_dlya_ctpizhki_king_kp-2020_luchshiy_vybor_2024_3834188022?utm_campaign=native&utm_medium=item_page_android&utm_source=soc_sharing","domain":"avito.ru","title":"Машинка для cтpижки king кp-2020 лучший выбор 2024 купить в Москве | Товары для дома и дачи | Авито","description":"Машинка для cтpижки king кp-2020 лучший выбор 2024: объявление о продаже в Москве на Авито. ✂️ Машинка для cтpижки KING КP-2020 лучший выбор для профeсcионaльнoго барбeрa ✂️ Модель КING РRОFЕSSIОNАL КР-2020 - это профессиональная машинка для стрижки волос на своей станции с цифровым дисплеем, роторным мотором и литий-ионной батареей. Преимущества машинки: 🌟 Роторный мотор производит 7500 колебаний в минуту, обеспечивая качество и непревзойдённую быстроту стрижки даже на очень густых и жестких волосах. 🌟 Машинка работает от аккумулятора, а также от сети. 🌟 Полная зарядка осуществляется на протя...","images":{"1280x960":"https://40.img.avito.st/image/1/1.jOfFFbaNNA7zoqID0TPzm7K3YjgShRI_R4MSPxaGFjhEh0M0EtBAb0PUGj0QghZoFdIWDA.LMvrVmba6SuWaWfUU9-jBzq4DtEfPF4cU1ejHSXQDLE?","140x105":"https://40.img.avito.st/image/1/1.jOfFFbaWNA7rtPAN0TPzm7K3YjgShRI_R4MSPxaGFjhEh0M0EtBAb0PUGj0QghZoFdIWDnW0ug6htyI.MeSI36j91SIs-mvQZk25EHJ5a8O_CgDQuMj9uj3a1tU?","32x32":"https://40.img.avito.st/image/1/1.jOfFFbaSNA4z9oCJoiHjDTOCQz9DhRY5Q4VHPEeCFT0SjkNqEdUSbkuHQThH0kRoR7QkDjP2Ig.4yrRD8gtE0En6b48syzvzpFEOqBMdz4xXrfYA6gJLWg?","640x480":"https://40.img.avito.st/image/1/1.jOfFFbaNNA7zvOIL0TPzm7K3YjgShRI_R4MSPxaGFjhEh0M0EtBAb0PUGj0QghZoFdIWDA.tcgewlCzWpcUD-dpx_UVyPGVNb61h4XB-RUpV2BZmb4?"}}}},"type":"link","direction":"out","isRead":true,"read":1710088336},"color":null,"deleted":false}},{"u2i-3rm5RIVuRW3BL_gpFn31fw":{"title":"","last_message":{"id":"dfde24f01269d5f621f5f23daecf4f04","author_id":0,"created":1709751214,"content":{"text":"[Системное сообщение] Переходить в другие мессенджеры или почту опасно ⚠️\n\nЗлоумышленники могут использовать их, чтобы выслать поддельный чек или форму для оплаты. \n\nОбщайтесь в чатах на Авито. Так мы сможем отследить действия злоумышленников и защитить вас от подозрительных ссылок. Как ещё защититься"},"type":"system","direction":"in","isRead":true,"read":1709779677},"color":null,"deleted":false}},{"u2u-XEKAVys7cv8fHckESKdJqw":{"title":"","last_message":{"id":"f538c37a39119d046efa6e1ed62138e0","author_id":0,"created":1709743179,"content":{"text":"[Системное сообщение] Переходить в другие мессенджеры или почту опасно ⚠️\n\nЗлоумышленники могут использовать их, чтобы выслать поддельный чек или форму для оплаты. \n\nОбщайтесь в чатах на Авито. Так мы сможем отследить действия злоумышленников и защитить вас от подозрительных ссылок. Как ещё защититься"},"type":"system","direction":"in","isRead":true,"read":1709744320},"color":null,"deleted":false}}]}

    
    const gotoNewAccAvito = () => {
        navigation("/newaccavito",  {state: {token: token }})
    } 

    const renderChat = () => {
        axios.get(`https://${url}/avito_chats/get_chats`, headers_auth)
        .then(res => {
  
          const full_chat_list = []

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

                        <div className="circle" id="blue">  { settingAcc ? <LuPlus color="#fff" size={24} className="pointer" /> : ""} </div>
                        <div className="circle" id="yellow">{ settingAcc ? <LuPlus color="#fff" size={24} className="pointer" /> : ""} </div>
                        <div className="circle" id="gray">  { settingAcc ? <LuPlus color="#fff" size={24} className="pointer" /> : ""} </div>
                        <div className="circle" id="green"> { settingAcc ? <LuPlus color="#fff" size={24} className="pointer" /> : ""} </div>
                        <div className="circle" id="red">   { settingAcc ? <LuPlus color="#fff" size={24} className="pointer" /> : ""} </div>

                    </div>

                    <div className="Accounts">
                            
                            <div className="AccOption" >
                                <BiHome size={24} />
                            </div>
                            
                            <div className="AccOption" onClick={gotoNewAccAvito} >
                                <LuPlus color="#000" size={24} />
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
                    </div>

                </div>



                <div className="ChatsBlock">

                    <div className="Search">

                        {/* <div className="SearchBlock"> */}

                                <div className="InputBlock">

                                    <div className="IconSearch pointer" >
                                        <CiSearch size={40} />
                                    </div>

                                    <input className="InputSearch" placeholder="Поиск ..." onChange={handleSearch}>

                                    </input>

                                </div>
                        {/* </div> */}
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
                                <div key={item_chat.id} className="ChatBlock" onClick={() => {
                                    openChatHandler(item_chat.id, item_chat.acc_name, item_chat.title);
                                    
                                }} >
                                    <Chat 
                                        id={item_chat.id}
                                        color={item_chat.color}
                                        userName={item_chat.acc_name}
                                        product={item_chat.title}
                                        lastMessage={item_chat.last_message}
                                        checkedInfo={item_chat.isRead}
                                        dateText={item_chat.date.toLocaleTimeString()}
                                        // dateText="12:13:13"
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