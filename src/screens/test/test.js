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
import axios from 'axios';
export const TestAxios = () => {
    const [messages, setMessages] = useState('qwe');
    
    const headers_auth = {
      headers: {
          'accept': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiYXVkIjpbImZhc3RhcGktdXNlcnM6YXV0aCJdLCJleHAiOjE3MTUzOTE0MDh9.jelb7sWwKFwuZinf8ViLBxKlCav5TeydBUjC3v26xWc',
          'Content-Type': 'application/json',
      }
  }
    const url = "messagecenter-9p86.onrender.com"
    useEffect(() => {
            // let socket = new WebSocket(`wss://${url}/endless_ws`)
            // socket.onopen = function(e) {
            //     // socket.send('Hello Server!');
            //     console.log("Sending to server", e);
            // };
            // socket.onmessage = function(event) {
            //     console.log(`Data:: `, event.data);
            //     setMessages(event.data)
            // };
            // socket.onclose = function(event) {
            //     if (event.wasClean) {
            //         console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            //     } else {
            //         console.log('[close] Connection died');
            //     }
            // };
            // socket.onerror = function(error) {
            //     console.log(`[error]`);
            // };

            console.log("saedv")
            
            const data = [{"First":[{"u2u-ZvYIW8c5Fzps3~AAlgzZVw":{"title":"","last_message":{"id":"d0e771d37bf6cae0b0f390ab93f62140","author_id":301295896,"created":1715367780,"content":{"text":"."},"type":"text","direction":"in","isRead":false},"color":null,"deleted":false}},{"u2u-fUou7m2QprJtGcB9WIaSCw":{"title":"","last_message":{"id":"4c4bb9784a938757621e8c05d94cb5d2","author_id":267389958,"created":1715367385,"content":{"text":"Тест"},"type":"text","direction":"in","isRead":false},"color":null,"deleted":false}},{"u2i-Zucg11tKK3uNt~n99kfmZw":{"title":"Apple Watch HK9 Ultra 2 (серебристо-чёрный) А591","last_message":{"id":"121d62ce59699d38634a06bdeafad4de","author_id":159470220,"created":1713213695,"content":{"text":"Hello world"},"type":"text","direction":"out","isRead":true,"read":1713262434},"color":null,"deleted":false}},{"u2i-Y8cqQM9WS_zE3KdWIK5HyQ":{"title":"Acer aspire 3 a315, 16 DDR5, 512 SSD","last_message":{"id":"2ed94da7e4df29df3d1626b686e4d082","author_id":0,"created":1710757327,"content":{"text":"[Системное сообщение] 🖊 Оставьте отзыв о продавце.\n\n[Системное сообщение] Расскажите, как прошло общение, встреча или сделка — что понравилось, а что не очень.\n\nВы можете оценить, например:\n— скорость ответов,\n— детальность информации о товаре,\n— соответствие товара описанию."},"type":"system","direction":"in","isRead":true,"read":1711102794},"color":null,"deleted":false}},{"u2i-zbA98ddZDgkE5Mf0jEQ7zQ":{"title":"Ноутбук Honor MagicBook Pro","last_message":{"id":"15f1ef07f9446e547fd9ee9b0a35add9","author_id":0,"created":1710673626,"content":{"text":"[Системное сообщение] 🖊 Оставьте отзыв о продавце.\n\n[Системное сообщение] Расскажите, как прошло общение, встреча или сделка — что понравилось, а что не очень.\n\nВы можете оценить, например:\n— скорость ответов,\n— детальность информации о товаре,\n— соответствие товара описанию."},"type":"system","direction":"in","isRead":true,"read":1711102800},"color":null,"deleted":false}},{"u2i-5AWK3qT7QP_inILZo9hVTA":{"title":"16' Ryzen 7 5800H RX 5500m 144гц","last_message":{"id":"1661108cb76caa87fb9586b5af9673a2","author_id":0,"created":1710666574,"content":{"text":"[Системное сообщение] 🖊 Оставьте отзыв о продавце.\n\n[Системное сообщение] Расскажите, как прошло общение, встреча или сделка — что понравилось, а что не очень.\n\nВы можете оценить, например:\n— скорость ответов,\n— детальность информации о товаре,\n— соответствие товара описанию."},"type":"system","direction":"in","isRead":true,"read":1711102812},"color":null,"deleted":false}},{"u2i-y4HSOr2UnEOjKnp8Mt3mgQ":{"title":"Букет-гигант из хризантемы","last_message":{"id":"2469edd0f3a371dc4c4cf100915bca1f","author_id":0,"created":1710068602,"content":{"text":"[Системное сообщение] 🖊 Оставьте отзыв о продавце.\n\n[Системное сообщение] Расскажите, как прошло общение, встреча или сделка — что понравилось, а что не очень.\n\nВы можете оценить, например:\n— скорость ответов,\n— детальность информации о товаре,\n— соответствие товара описанию."},"type":"system","direction":"in","isRead":true,"read":1710073060},"color":null,"deleted":false}},{"u2i-D3M2eNfsUTOAlYgqtLVGGA":{"title":"Машинка для cтpижки king кp-2020 топ в 2024 А400","last_message":{"id":"12b5f266023adc6420be4347a0910255","author_id":159470220,"created":1709797852,"content":{"link":{"text":"https://www.avito.ru/moskva/bytovaya_tehnika/mashinka_dlya_ctpizhki_king_kp-2020_luchshiy_vybor_2024_3834188022?utm_campaign=native&utm_medium=item_page_android&utm_source=soc_sharing","url":"https://www.avito.ru/moskva/bytovaya_tehnika/mashinka_dlya_ctpizhki_king_kp-2020_luchshiy_vybor_2024_3834188022?utm_campaign=native&utm_medium=item_page_android&utm_source=soc_sharing","preview":{"url":"https://www.avito.ru/moskva/bytovaya_tehnika/mashinka_dlya_ctpizhki_king_kp-2020_luchshiy_vybor_2024_3834188022?utm_campaign=native&utm_medium=item_page_android&utm_source=soc_sharing","domain":"avito.ru","title":"Машинка для cтpижки king кp-2020 лучший выбор 2024 купить в Москве | Товары для дома и дачи | Авито","description":"Машинка для cтpижки king кp-2020 лучший выбор 2024: объявление о продаже в Москве на Авито. ✂️ Машинка для cтpижки KING КP-2020 лучший выбор для профeсcионaльнoго барбeрa ✂️ Модель КING РRОFЕSSIОNАL КР-2020 - это профессиональная машинка для стрижки волос на своей станции с цифровым дисплеем, роторным мотором и литий-ионной батареей. Преимущества машинки: 🌟 Роторный мотор производит 7500 колебаний в минуту, обеспечивая качество и непревзойдённую быстроту стрижки даже на очень густых и жестких волосах. 🌟 Машинка работает от аккумулятора, а также от сети. 🌟 Полная зарядка осуществляется на протя...","images":{"1280x960":"https://40.img.avito.st/image/1/1.jOfFFbaNNA7zoqID0TPzm7K3YjgShRI_R4MSPxaGFjhEh0M0EtBAb0PUGj0QghZoFdIWDA.LMvrVmba6SuWaWfUU9-jBzq4DtEfPF4cU1ejHSXQDLE?","140x105":"https://40.img.avito.st/image/1/1.jOfFFbaWNA7rtPAN0TPzm7K3YjgShRI_R4MSPxaGFjhEh0M0EtBAb0PUGj0QghZoFdIWDnW0ug6htyI.MeSI36j91SIs-mvQZk25EHJ5a8O_CgDQuMj9uj3a1tU?","32x32":"https://40.img.avito.st/image/1/1.jOfFFbaSNA4z9oCJoiHjDTOCQz9DhRY5Q4VHPEeCFT0SjkNqEdUSbkuHQThH0kRoR7QkDjP2Ig.4yrRD8gtE0En6b48syzvzpFEOqBMdz4xXrfYA6gJLWg?","640x480":"https://40.img.avito.st/image/1/1.jOfFFbaNNA7zvOIL0TPzm7K3YjgShRI_R4MSPxaGFjhEh0M0EtBAb0PUGj0QghZoFdIWDA.tcgewlCzWpcUD-dpx_UVyPGVNb61h4XB-RUpV2BZmb4?"}}}},"type":"link","direction":"out","isRead":true,"read":1710088336},"color":null,"deleted":false}},{"u2i-3rm5RIVuRW3BL_gpFn31fw":{"title":"","last_message":{"id":"dfde24f01269d5f621f5f23daecf4f04","author_id":0,"created":1709751214,"content":{"text":"[Системное сообщение] Переходить в другие мессенджеры или почту опасно ⚠️\n\nЗлоумышленники могут использовать их, чтобы выслать поддельный чек или форму для оплаты. \n\nОбщайтесь в чатах на Авито. Так мы сможем отследить действия злоумышленников и защитить вас от подозрительных ссылок. Как ещё защититься"},"type":"system","direction":"in","isRead":true,"read":1709779677},"color":null,"deleted":false}},{"u2u-XEKAVys7cv8fHckESKdJqw":{"title":"","last_message":{"id":"f538c37a39119d046efa6e1ed62138e0","author_id":0,"created":1709743179,"content":{"text":"[Системное сообщение] Переходить в другие мессенджеры или почту опасно ⚠️\n\nЗлоумышленники могут использовать их, чтобы выслать поддельный чек или форму для оплаты. \n\nОбщайтесь в чатах на Авито. Так мы сможем отследить действия злоумышленников и защитить вас от подозрительных ссылок. Как ещё защититься"},"type":"system","direction":"in","isRead":true,"read":1709744320},"color":null,"deleted":false}}]}]
            
            axios.get(`https://${url}/avito_chats/get_chats`, headers_auth)
            .then(res => {
              // console.log(res.data)
              console.clear()
              const all_chat = res.data
            
              for(const chat in all_chat) {
                const acc_chats = all_chat[chat]

                for(const chat in acc_chats ) {
                  const list_chat =  acc_chats[chat]
                  const account_name_chat_list = chat

                  for(const con_chat in list_chat) {
                    const dif_chat =  list_chat[con_chat]
                    for(const dif_chat_info in dif_chat) {
                      const chat_data = dif_chat[dif_chat_info]
                      
                      // console.log(chat_data)

                      const chat_id = dif_chat_info
                      const chat_title = chat_data.title
                      const chat_last_message = chat_data.last_message
                      const chat_colro = chat_data.color
                      const chat_deleted = chat_data.deleted

                      // console.log(chat_last_message)

                      const last_message_author_id = chat_last_message.author_id
                      const last_message_content = chat_last_message.content.text
                      const last_message_created = chat_last_message.created
                      const last_message_direction = chat_last_message.direction
                      const last_message_isRead = chat_last_message.isRead

                      console.log(last_message_content, last_message_direction, last_message_isRead)


                    }
                  }

                }

              }

            })
            .catch(err =>{
                console.log(err)
            })
            .finally(() => {
                console.log("Запрос выполнился")
            })

            
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