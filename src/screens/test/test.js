import axios from "axios"


export const TestAxios = () => {
    // console.clear()
    const url = "messagecenter-9p86.onrender.com"

    const user_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMiIsImF1ZCI6WyJmYXN0YXBpLXVzZXJzOmF1dGgiXSwiZXhwIjoxNzE1MTA3NTk4fQ.BtVegYNHZD9NWHLmJQ1iNf1r9wrk02v7VwUkCePRfmc"
    
    const post_data = {
        "profile_id": 159470220,
        "client_id": "Pm4BmvaY4LPFHQ6Oo_Hu",
        "client_secret": "qBO1H1ssvcfotR15Nw1Qpxrs_1yG9vyhWb9tbgj5",
        "account_name": "string"
      }


    const auth_token = `Bearer ${user_token}`

    const post_headers = {
        headers: {
            'accept': 'application/json',
            'Authorization': auth_token,
            'Content-Type': 'application/json',
        }
    }

    // axios.post(`https://${url}/avito_accounts/register_account`, post_data, post_headers)
    // .then(res => {
    //     console.log(res.data)
    // })
    // .catch(err => {
    //     console.log(err)
    // })
    const get_chat_headers = {
        headers: {
            'accept': 'application/json',
            'Authorization': auth_token,
            'Content-Type': 'application/json',
        }
    }
    
    axios.get(`https://${url}/avito_chats/get_chats`, get_chat_headers)
    .then(res => {
        console.log(res.data)
    })
    .catch(err => {
        console.log(err)
    })

    return(

        <>
        
            as
        </>

    )


}