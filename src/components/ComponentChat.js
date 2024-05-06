import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { GoPaperAirplane } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { IoCheckmarkOutline } from "react-icons/io5";
export const Chat = ({id, color, userName, product, lastMessage, checkedInfo, dateText, amountMessage}) => {
    
    const openChat = () => {
        console.log("chat id", id)

    }

    return(

    <div className="Chat" onClick={openChat}>
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
                        checkedInfo === true ? <IoCheckmarkDoneOutline size={22} color="#A0A0A0"/> : <IoCheckmarkOutline  size={22} color="#A0A0A0"/>
                    }
                </div>
                <div className="DateText">
                    {dateText}
                </div>
            </div>

            <div className="BottomInfoBlock">
                <div className="ChatInfoCircle">
                    {amountMessage}
                </div>
            </div>

        </div>

    </div>            


    )
}