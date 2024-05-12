import { useState } from "react";
import { Message } from './ComponentMessage';
import { FaPlus } from "react-icons/fa6";
import { LuPlus } from "react-icons/lu";
import { GoPaperAirplane } from "react-icons/go";
import { IoArrowBackOutline } from "react-icons/io5";

export const MessageBlock = ({id, chatName, product, onClickColor, onClickBack,settingAcc, messages}) => {
    const messagesAvito = {
        "messages": [
            {
                "id": "121d62ce59699d38634a06bdeafad4de",
                "author_id": 159470220,
                "created": 1713213695,
                "content": {
                    "text": "Hello world"
                },
                "type": "text",
                "direction": "out",
                "isRead": true,
                "read": 1713262434
            },
            {
                "id": "1efa7ef1401b8684cc41400f6dab3f51",
                "author_id": 31935588,
                "created": 1711851669,
                "content": {
                    "text": "Здравствуйте! Вы закрылись?"
                },
                "type": "text",
                "direction": "in",
                "isRead": true,
                "read": 1712169945
            },
            {
                "id": "436ae55884b0e0abc0bddadd7f585265",
                "author_id": 159470220,
                "created": 1707896490,
                "content": {
                    "text": "Цена актуальна"
                },
                "type": "text",
                "direction": "out",
                "isRead": true,
                "read": 1707897068
            },
            {
                "id": "681b3068a4b7deec5e9d2181aadbc0b0",
                "author_id": 159470220,
                "created": 1707896484,
                "content": {
                    "text": "Все есть"
                },
                "type": "text",
                "direction": "out",
                "isRead": true,
                "read": 1707897068
            },
            {
                "id": "1d1b9028a81d2748174ddd342a5edaf4",
                "author_id": 159470220,
                "created": 1707896483,
                "content": {
                    "text": "Здравствуйте"
                },
                "type": "text",
                "direction": "out",
                "isRead": true,
                "read": 1707897068
            },
            {
                "id": "11a33bc6d72aa94a34fcc09ff6df7343",
                "author_id": 31935588,
                "created": 1707883507,
                "content": {
                    "text": "Здравствуйте! В наличии? Цена актуальна?"
                },
                "type": "text",
                "direction": "in",
                "isRead": true,
                "read": 1707897025
            }
        ],
        "meta": {
            "has_more": false
        }
    }
    const [listMessage, setListMessage] = useState([])

    const renderMessage = () => {
        const list = []
        for(const message in messagesAvito) {
            
            const data_message = messagesAvito[message]

            const date = new Date(data_message.created * 1000);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const formattedTime = `${hours}:${minutes}`;

            console.log(data_message)

            // list.push({
            //     put: data_message.direction,
            //     text: data_message.content.text,
            //     check: data_message.isRead,
            //     time: formattedTime,
            // })
            // console.log(list)
        }

        setListMessage(list)

    }
    // setListMessage(messages)
    renderMessage()

    const [messageText, setMessageText] = useState('')

    const inputMessage = (e) => {
        setMessageText(e.target.value);
    };

    const sendMessage = () => {
        console.log(messageText)
    }

    const handleColorClick = (color, id, user_name, onClickColor) => {
        onClickColor(color, id, user_name);
    }

    const handleBackClick = (onClickBack) => {
        // Вызываем функцию, которая передается через props в компонент MessageBlock
        // и передаем цвет и id
        onClickBack(null);
    }

    return(

       <div className="MessageBlock" onClick={renderMessage()}>
               
               <div className="TopPanel">
                   <div className="Back">
                   <IoArrowBackOutline size={32} onClick={() => {
                            handleBackClick(onClickBack)
                        }} 
                    />
                   </div>
                   <div className="MessageChatInfo">
                       <div className="ChatName">
                           {chatName}
                       </div>
                       <div className="ChatNameProduct">
                           {product}
                       </div>
                   </div>

                   <div className="tabs">
                   <div className="elips" id="blue" >
                        {!settingAcc ? <LuPlus color="#fff" size={20} className="pointer" onClick={() => handleColorClick("blue", id, chatName, onClickColor)} /> : ""}
                    </div>
                       <div className="elips" id="yellow" >
                            {!settingAcc ? <LuPlus color="#fff" size={20} className="pointer"  onClick={() => handleColorClick("yellow", id, chatName, onClickColor)} /> : ""}
                       </div>
                       <div className="elips" id="gray" >
                            {!settingAcc ? <LuPlus color="#fff" size={20} className="pointer"  onClick={() => handleColorClick("gray", id, chatName, onClickColor)} /> : ""}
                       </div>
                       <div className="elips" id="green" >
                            {!settingAcc ? <LuPlus color="#fff" size={20} className="pointer"  onClick={() => handleColorClick("green", id, chatName, onClickColor)} /> : ""}
                       </div>
                       <div className="elips" id="red"  >
                            {!settingAcc ? <LuPlus color="#fff" size={20} className="pointer"  onClick={() => handleColorClick("red", id, chatName, onClickColor)}/> : ""}
                       </div>
                   </div>

               </div>

           <div className="Messages">
            
                {
                
         
               }



           </div> 

           <div className="InputMessageBlock">

               <FaPlus color="#000" size={32} className="pointer __pl"/>
               <textarea className="InputMessage" placeholder="Сообщение"
                       value={messageText}
                       onChange={inputMessage}
               />
               <GoPaperAirplane className="IconSend pointer __pr" 
                   size={32}
                   onClick={sendMessage}
               />

           </div>

       </div>

        
    )

} 