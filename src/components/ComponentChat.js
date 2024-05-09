import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { GoPaperAirplane } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { IoCheckmarkOutline } from "react-icons/io5";
import { MessageBlock } from "./ComponentsMessageBlock";


export const Chat = ({id, color, userName, product, lastMessage, checkedInfo, dateText, amountMessage}) => {
    
    return(

    <div className="Chat" >
        <div className="circle __CircleChat" id={color}/>
    
        <div className="ChatInfo">
            <div className="UserName">
                {userName}
            </div>

            <div className="ProductName">
                "{product}"
            </div>

            <div className="LastMessage">
                {lastMessage}
            </div>
        </div>
    
        <div className="OtherInfo">
            <div className="TopInfoBlock">
                <div className="Checked">
                    {
                        amountMessage > 0 ? "" : checkedInfo === true ? <IoCheckmarkDoneOutline size={22} color="#A0A0A0"/> : <IoCheckmarkOutline  size={22} color="#A0A0A0"/> 
                        // 
                        
                    }
                </div>
                <div className="DateText">
                    {dateText}
                </div>
            </div>

            <div className="BottomInfoBlock">
               {amountMessage === 0 ? "" : <div className="ChatInfoCircle">
                    {amountMessage}
                </div> }
            </div>

        </div>

    </div>            


    )
}