import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { GoPaperAirplane } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

export const Chat = ({id, color, userName, product, lastMessage, checkedInfo, dateText, ChatInfoCircle}) => {
    
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
                        checkedInfo === "checked" ? <IoCheckmarkDoneOutline size={22} color="#A0A0A0"/> : <div>qw</div>
                    }
                </div>
                <div className="DateText">
                    {dateText}
                </div>
            </div>

            <div className="BottomInfoBlock">
                <div className="ChatInfoCircle">
                    {ChatInfoCircle}
                </div>
            </div>

        </div>

    </div>            


    )
}