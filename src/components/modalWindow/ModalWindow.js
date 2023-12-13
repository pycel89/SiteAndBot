import React, { useEffect,  useState } from 'react';
import "./style.css";
import { getAllMessages, sendMessage } from '../../http/index'
import closeImg from '../../crosshd_106070.png'

const Modal = ({ activ, setActiv }) => {

    const [chatMessage, setChatMessage] = useState([])
    const [message, setMessage] = useState('')

    const renderAllMessages = () => {
        getAllMessages().then(data => {
            if (data)
                setChatMessage(data);
        })
    }
    const clickEnter = async () => {
        if (!message) {
            return;
        }
        //let getMessage;
        const getMessage = await sendMessage(message)
        const newChat =[...chatMessage];
        //const newChat =[]
        newChat.push({ isBot: false, messgeText: message })
        //setChatMessage(chatMessage.push({isBot: false, messgeText: message}))

        for (let i = 0; i < getMessage.length; ++i) {
            newChat.push({ isBot: true, messgeText: getMessage[i].messgeText });
        }
        setChatMessage(newChat)
        setMessage("")
    }

    useEffect(renderAllMessages, []);
    useEffect(()=>{
        let block = document.getElementById('scrollContainer')
        block.scrollTop = block.scrollHeight;

    },[chatMessage]);


    return (
        <div className={activ ? "modal activ" : "modal"} onClick={() => setActiv(false)}>
            <div className='modal__content' onClick={e => e.stopPropagation()}>
                <div className='title'>
                    <p>Я могу искать документы по номеру заявки, сумме заявки, </p>
                    <p>или ID отправленного документа</p>
                </div>
                <div id='scrollContainer' className='modal__container'>
                    {
                        chatMessage.map((data) => {
                            let caption = "Вы";
                            let formMessage = "message__left";
                            if (data.isBot) {
                                caption = "Бот";
                                formMessage = "message__right"
                            }
                            return (
                                <div className={formMessage}>
                                    <p >{data.messgeText}</p>
                                    <span >{caption}</span>
                                </div>
                            )
                        })}
                </div>
                <label>
                    <input className='inputMessage' placeholder="Задай мне вопрос"
                        value={message}
                        onChange={e =>
                            setMessage(e.target.value)
                        }
                        onKeyDown={e => {
                            if (e.keyCode === 13) {
                                clickEnter()
                            }
                        }
                        }
                    /></label>
                <input type="submit" className='messageButton' value="Отправить" onClick={() => {
                    clickEnter()
                }
                } />
            </div>
            <img height='60px' src={closeImg}></img>
        </div>
    );
};
export default Modal;