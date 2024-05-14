import { useEffect, useState } from "react";
import { Message } from './ComponentMessage';
import { FaPlus } from "react-icons/fa6";
import { LuPlus } from "react-icons/lu";
import { GoPaperAirplane } from "react-icons/go";
import { IoArrowBackOutline } from "react-icons/io5";

export const MessageBlock = ({id, chatName, product, onClickColor, onClickBack,settingAcc, messages}) => {
    
    const [listMessage, setListMessage] = useState([])

    const renderMessage = () => {
        const list_mess = []
        for(const i in messages) {
            const dif_mess = messages[i]
            for(const j in dif_mess) {
                if (dif_mess[j].content && dif_mess[j].content.text) {
                    if (!dif_mess[j].content.text.startsWith("[Системное сообщение]")) {
                        const date = new Date(dif_mess[j].created * 1000); // Умножаем на 1000, так как timestamp обычно указывает на количество секунд, а не миллисекунд
                        const hours = date.getHours();
                        const minutes = date.getMinutes();
                        const n_date = `${hours}:${minutes}`
                        list_mess.push({
                            id: dif_mess[j].id,
                            put:  dif_mess[j].direction,
                            text:  dif_mess[j].content.text,
                            check:  dif_mess[j].isRead,
                            time:  n_date
                            
                        })
                        setListMessage(list_mess)
                    } 
                }   
            }
        }
    }

    useEffect(() => {
        renderMessage();
    }, [messages]); 

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

       <div className="MessageBlock">
               
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
                        listMessage.map(itemdata => (
                            <Message 
                                key={itemdata.id}
                                put={itemdata.put}
                                text={itemdata.text}
                                check={itemdata.check}
                                time={itemdata.time}
                            />
                        ))
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