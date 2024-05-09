//     const user_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiYXVkIjpbImZhc3RhcGktdXNlcnM6YXV0aCJdLCJleHAiOjE3MTUyNTE5NTF9.O-nqeMCymoPLCXrPGbN6j3IhzkbHF_fUOwSYA_ER764"    
//     const post_data = {
//         "profile_id": 159470220,
//         "client_id": "Pm4BmvaY4LPFHQ6Oo_Hu",
//         "client_secret": "qBO1H1ssvcfotR15Nw1Qpxrs_1yG9vyhWb9tbgj5",
//         "account_name": "string"
//       }


//     const auth_token = `Bearer ${user_token}`

//     const post_headers = {
//         headers: {
//             'accept': 'application/json',
//             'Authorization': auth_token,
//             'Content-Type': 'application/json',
//         }
//     }
//     const get_chat_headers = {
//         headers: {
//             'accept': 'application/json',
//             'Authorization': auth_token,
//             'Content-Type': 'application/json',
//         }
//     }


import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

export const TestAxios = () => {
    const [messages, setMessages] = useState('qwe');
    
    const url = "messagecenter-9p86.onrender.com"
    useEffect(() => {
            let socket = new WebSocket(`wss://${url}/endless_ws`)
            socket.onopen = function(e) {
                // socket.send('Hello Server!');
                console.log("Sending to server", e);
            };
            socket.onmessage = function(event) {
                console.log(`Data:: `, event.data);
                setMessages(event.data)
            };
            socket.onclose = function(event) {
                if (event.wasClean) {
                    console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
                } else {
                    console.log('[close] Connection died');
                }
            };
            socket.onerror = function(error) {
                console.log(`[error]`);
            };
    }, []);

  return (
    <div>
      <h1>Messages:</h1>
      <ul>
        {messages}
      </ul>
    </div>
  );
}