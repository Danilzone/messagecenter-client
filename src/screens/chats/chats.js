import { NavLink } from "react-router-dom"
// import { Socket } from "socket.io-client"
// import { io } from "socket.io-client"
import { PiDotsThreeOutlineLight } from "react-icons/pi";

import './chats.css'
export const Chats = () => {


    console.clear()

    // const address = "127.0.0.1:5000"

    // const socket = new WebSocket(`ws://${address}`);
    // socket.on('connect', () => {
    //     console.log('Connected to ws://url');
    // });
    
    // socket.on('data', (data) => {
    //     console.log('Received data:', data);
    // });
    
    // socket.on('disconnect', () => {
    //     console.log('Disconnected from ws://url');
    // });

    const itemAccount = document.querySelectorAll('.Account')

    return(

        <div className="wrapper">
            
            <div className="MainSideBar">
                <div className="OptionsPanel">
                    <div className="ColorFolders">

                        <div className="circle" id="blue"/>
                        <div className="circle" id="yellow"/>
                        <div className="circle" id="gray"/>
                        <div className="circle" id="green"/>
                        <div className="circle" id="red"/>

                    </div>
                    
                    <div className="Accounts">
                        <PiDotsThreeOutlineLight onClick={() => {console.log("tap")}} size={32} />
                       
                        <div className="AccountsList">
                            {/* <div className="List">
                                <div className="Account">ИГ</div>
                                <div className="Account">ИГ</div>
                                <div className="Account">ИГ</div>
                                <div className="Account">ИГ</div>
                                <div className="Account">ИГ</div>
                                <div className="Account">ИГ</div>
                                <div className="Account">ИГ</div>
                                <div className="Account">ИГ</div>
                                <div className="Account">ИГ</div>
                                <div className="Account">ИГ</div>
                                <div className="Account">ИГ</div>
                                <div className="Account">ИГ</div>
                                <div className="Account">ИГ</div>
                            </div> */}
                            
                            <div className="List">

                                <div className="Account">ИГ</div>
                                <div className="Account">ИГ</div>
                                <div className="Account">ИГ</div>     

                            </div>

                        </div>
                    </div>
                </div>

                <div className="Chats">

                </div>
            </div>

            <div className="MessageBlock">
                
            </div>

        </div>

    )
}