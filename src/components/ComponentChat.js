import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { GoPaperAirplane } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { IoCheckmarkOutline } from "react-icons/io5";
import { MessageBlock } from "./ComponentsMessageBlock";
import { useState } from "react";
import axios from "axios";

export const Chat = ({id, color, userName, product, lastMessage, checkedInfo, dateText, amountMessage, settingAcc, thisSetting}) => {
    return(

    <div className="Chat" >
        <div className="FolderChat">
            <div className="circle __CircleChat" id={color == null ? "white" : `${color}` }/>   
        </div>
        <div className="Information">
            <div className="ChatInfo">
                <div className="UserName">
                    {userName}
                </div>

                <div className="ProductName">
                    «{product}»
                </div>

                <div className="LastMessage">
                    {lastMessage}
                </div>
            </div>


            <div className="OtherInfo">
                <div className="TopInfoBlock">
                    <div className="Checked">
                        {
                            amountMessage > 0 ? "" : checkedInfo === true ? <IoCheckmarkDoneOutline size={20} color="#A0A0A0"/> : <IoCheckmarkOutline  size={20} color="#A0A0A0"/> 
                            // 
                            
                        }
                    </div>
                    <div className="DateText">
                        {dateText}
                    </div>
                </div>

           
               {
                    !settingAcc ? 
                    amountMessage == 0 ? "" : <div className="ChatInfoCircle">
                                                    {amountMessage}
                                                </div>
                            : thisSetting ? <div className="CircleSettingItemTrue"><IoCheckmarkOutline className="__chekmaxright" size={14} color="#ffffff"/> </div> : <div className="CircleSettingItem"/>
                }
          
        </div>



        </div>
    </div>            


    )
}