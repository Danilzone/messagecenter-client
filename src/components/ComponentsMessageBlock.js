import { useState } from "react";
import { Message } from './ComponentMessage';
import { FaPlus } from "react-icons/fa6";
import { LuPlus } from "react-icons/lu";
import { GoPaperAirplane } from "react-icons/go";

export const MessageBlock = ({id, chatName, product, onClickColor, settingAcc}) => {

    const [messageText, setMessageText] = useState('')

    const inputMessage = (e) => {
        setMessageText(e.target.value);
    };

    const sendMessage = () => {
        console.log(messageText)
    }

    const handleColorClick = (color, id, user_name) => {
        // Вызываем функцию, которая передается через props в компонент MessageBlock
        // и передаем цвет и id
        onClickColor(color, id, user_name);
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
                       <div className="elips" id="blue" >
                            {!settingAcc ? <LuPlus color="#fff" size={20} className="pointer" onClick={() => handleColorClick("blue", id, chatName)} /> : ""}
                       </div>
                       <div className="elips" id="yellow" >
                            {!settingAcc ? <LuPlus color="#fff" size={20} className="pointer"  onClick={() => handleColorClick("yellow", id, chatName)} /> : ""}
                       </div>
                       <div className="elips" id="gray" >
                            {!settingAcc ? <LuPlus color="#fff" size={20} className="pointer"  onClick={() => handleColorClick("gray", id, chatName)} /> : ""}
                       </div>
                       <div className="elips" id="green" >
                            {!settingAcc ? <LuPlus color="#fff" size={20} className="pointer"  onClick={() => handleColorClick("green", id, chatName)} /> : ""}
                       </div>
                       <div className="elips" id="red"  >
                            {!settingAcc ? <LuPlus color="#fff" size={20} className="pointer"  onClick={() => handleColorClick("red", id, chatName)}/> : ""}
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
               <Message
                   put="in"
                   text="wevnwoevcnwecn weoclnwe cowelncwopecln oerjbvoierjkv oerwv wocn wpecnwe;qlcm wep[c mpweocnmwe;lm"
                   check={false} 
                   time="12:33"
               />         
                <Message
                   put="out"
                   text="wevnwoev wocn wpecnq d qwdc  e.wvnerkjv bnsdfkjgbvdf,b23T @$>t34ytk345o hmp45hn eekwe;qcn wpecnwe;qcn wpecnwe;qcn wpecnwe;qcn wpecnwe;qcn wpecnwe;qcn wpecnwe;qcn wpecnwe;qcn wpecnwe;qcn wpecnwe;qcn wpecnwe;qcn wpecnwe;qcn wpecnwe;qcn wpecnwe;qcn wpecnwe;qcn wpecnwe;qcn wpecnwe;qcn wpecnwe;qlcmwe;lm"
                   check={false} 
                   time="12:33"
               />                  
                <Message
                   put="out"
                   text="wevnw;lenvo4vnr.v lwrc vsdlc 4k23[4pflaxc0-adckj0ir3 ng3k54jgetnbfgb ,v lkdsvnaspoefn0a nwo gka gare s.rv;v ,wv3p4tj0395yj50gdrlgj3p5 235 235235we wef aslv x.zc,v ;ed #rtw$mr W4MT GPETNBGFKNL m"
                   check={false} 
                   time="12:33"
               />    
                <Message
                   put="in"
                   text="34gj3ogb we bnfo3reuvbuiwergb3984 fugedsjfdn2o3ldmq;l cnlsolvbneiarlbvierufgbi4b<biqk3jbr3BRKWTB,  K2FB BWRAVIOUERBVV,DSMV KED.BJN;SEFNLKSEHNFLSNCVLH  OERNGBM,V L,EWRKNGLK24OIGHO2IN3RF ,W Gn8Y98y98fy2*(Y(*RTY#(*Ytfvnlekwrvnlervn"
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