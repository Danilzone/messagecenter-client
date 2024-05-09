import { useState } from "react";
import { Message } from './ComponentMessage';
import { FaPlus } from "react-icons/fa6";
import { LuPlus } from "react-icons/lu";
import { GoPaperAirplane } from "react-icons/go";

export const MessageBlock = ({id, chatName, product, onClickColor}) => {

    const [messageText, setMessageText] = useState('')

    const inputMessage = (e) => {
        setMessageText(e.target.value);
    };

    const sendMessage = () => {
        console.log(messageText)
    }

    const handleColorClick = (color, id) => {
        // Вызываем функцию, которая передается через props в компонент MessageBlock
        // и передаем цвет и id
        onClickColor(color, id);
    }

    return(

       <div className="MessageBlock">
               
               <div className="TopPanel">
                   
                   <div className="MessageChatInfo">
                       <div className="ChatName">
                           {chatName}
                       </div>
                       <div className="ChatNameProduct">
                           {product}
                       </div>
                   </div>

                   <div className="tabs">
                       <div className="elips" id="blue"    onClick={() => handleColorClick("blue", id)}>
                           <LuPlus color="#fff" size={20} />
                       </div>
                       <div className="elips" id="yellow"  onClick={() => handleColorClick("yellow", id)}>
                           <LuPlus color="#fff" size={20}/>
                       </div>
                       <div className="elips" id="gray"   onClick={() => handleColorClick("gray", id)}>
                           <LuPlus color="#fff" size={20}/>
                       </div>
                       <div className="elips" id="green"  onClick={() => handleColorClick("green", id)}>
                           <LuPlus color="#fff" size={20}/>
                       </div>
                       <div className="elips" id="red"    onClick={() => handleColorClick("red", id)}>
                           <LuPlus color="#fff" size={20}/>
                       </div>
                   </div>

               </div>

           <div className="Messages">
               <Message
                   put="out"
                   text={chatName}
                   check={true} 
                   time="12:23"
               />                       
               <Message
                   put="in"
                   text={product}
                   check={false} 
                   time="12:33"
               />                       
               
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