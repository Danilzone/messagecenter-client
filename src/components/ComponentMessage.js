
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { IoCheckmarkOutline } from "react-icons/io5";

export const Message = ({put, text, check, time}) => {

    return(
        <div className={put === "out" ? "Message __my" : "Message __other" }>
           {text}
            <div className="Check">
                
            {
                put === "out" ? 
                    check === true ?
                        <IoCheckmarkDoneOutline size={22} color="#A0A0A0"/> :
                        <IoCheckmarkOutline  size={22} color="#A0A0A0"/>
                 : ""
            }
                {time}
            </div>
    </div>
    )
}