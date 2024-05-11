import { useState } from "react";
import { Message } from './ComponentMessage';
import { FaPlus } from "react-icons/fa6";
import { LuPlus } from "react-icons/lu";
import { GoPaperAirplane } from "react-icons/go";
import { IoArrowBackOutline } from "react-icons/io5";

export const MessageBlock = ({id, chatName, product, onClickColor, onClickBack,settingAcc}) => {

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
            
                {/* <Message
                   put="in"
                   text="34gj3ogb we bnfo3reuvbuiwergb3984 fugedsjfdn2o3ldmq;l cnlsolvbneiarlbvierufgbi4b<biqk3jbr3BRKWTB,  K2FB BWRAVIOUERBVV,DSMV KED.BJN;SEFNLKSEHNFLSNCVLH  OERNGBM,V L,EWRKNGLK24OIGHO2IN3RF ,W Gn8Y98y98fy2*(Y(*RTY#(*Ytfvnlekwrvnlervn"
                   check={false} 
                   time="12:33"
               />     */}



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