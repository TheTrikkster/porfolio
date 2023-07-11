
import React, { useState, useRef } from 'react';
import styles from './Chatbot.module.scss';
import { PacmanLoader } from 'react-spinners';

type MessagesType = {
  role: string,
  content: string
};

export default function Chatbot() {
  const messageRef:any = useRef();
  const [messages, setMessages] = useState<MessagesType[]>([])
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setDisabled(true);
    
    const prompt = messageRef.current.value;
    messageRef.current.value = "";

    setLoading(true);

    let newMessageList = [
      ...messages,
      {
        role: "user",
        content: prompt
      }
    ];

    try {
      const response = await fetch("/api/chatGpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newMessageList)
      });

      if(!response.ok) {
        return;
      };
      
      const data = await response.json()
      newMessageList.push({
        role: data.role,
        content: data.content
      });
      setMessages(newMessageList);
    } catch(error:any) {
      console.error(error.message)
    } finally {
      setLoading(false)
      setDisabled(false)
    };

  };

  return (
    <div className={styles.chatbot_container}>
      <h2 className={styles.chatbot_title}>Chat</h2>
      <div className={styles.chatbot_messages_container}>
        {messages.length ? 
        messages.map((message, index) => {
          return(
            <div  key={index} className={`${styles.chatbot_message} ${message.role === "assistant" ? styles.bot : styles.you}`}>
              {message.role === "assistant" ? (
                <label>Bot</label>
              ) : (
                <label>You:</label>
              )}
              <p>{message.content}</p>
            </div>
          )
        }) : (
          <div className={styles.chatbot_notDiscussed}>
            <div>
            <p>You can ask a questions about Doukhaev Israil developpement skills, experience...</p>
            <p>Exemple: who is israil ? what are his skills ?</p>
            </div>
          </div>
        )}
      </div>
      {loading ?  <PacmanLoader role="status" color="#0070F3" size={25}/> : <p className={styles.chatbot_emty_p}></p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" placeholder='Ask a question' className={styles.chatbot_input} ref={messageRef} required disabled={disabled}/>
        <button type='submit' className={styles.chatbot_button}>Send</button>
      </form>
    </div>
  )
}