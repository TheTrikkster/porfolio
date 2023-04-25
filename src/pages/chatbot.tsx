import Head from 'next/head';
import Image from 'next/image';
import { useState, useRef } from 'react';
import styles from '@components:./components/styles/Chatbot.module.scss';
import DownloadButton from '../components/downlaod/Download';

type MessagesType = {
  role: string,
  content: string
};

export default function Chatbot() {
  const messageRef:any = useRef();
  const [messages, setMessages] = useState<MessagesType[]>([])
  // const [displayMessage, setDisplayMessage] = useState("Hi there")
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
      // setDisplayMessage(data.content)
    } catch(error:any) {
      console.error(error.message)
    } finally {
      setLoading(false)
      setDisabled(false)
    };

  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main_container}>
        <div className={styles.general_block}>
          <h1 className={styles.title}>Portfolio</h1>
          <div className={styles.image_container}>
            {/* <Image src="/../../ISRAIL-PHOTOSHOP.jpg" alt="Photo of Doukhaev Israil" width={500} height={500}/> */}
          </div>
          <p className={styles.description}>
            Une petite description de vous-même ou de votre portfolio.
          </p>
          <DownloadButton />
        </div>
        <div className={styles.chatbox}>
          <h2 className={styles.chatbot_title}>Chat</h2>
          <div className={styles.messages_container}>
            {messages.length ? 
            messages.map((message, index) => {
              return(
                <div  key={index} className={`${styles.message} ${message.role === "assistant" ? styles.bot : ""}`}>
                  {message.role === "assistant" ? (
                    <label>Bot</label>
                  ) : (
                    <label>You:</label>
                  )}
                  <p>{message.content}</p>
                </div>
              )
            }) : (
              <div className={styles.notDiscussed}>
                <div>
                <p>You can ask a questions about Doukhaev Israil developpement skills, experience...</p>
                <p>Exemple: who is israil ? what are his skills ?</p>
                </div>
              </div>
            )}
          </div>
          {loading ? <p>botty is thinking</p> : <p className={styles.emty_p}></p>}
          <form className={styles.my_form} onSubmit={handleSubmit}>
            <input type="text" placeholder='Ask a question' className={styles.my_input} ref={messageRef} required disabled={disabled}/>
            <button type='submit' className={styles.my_button}>Send</button>
          </form>
        </div>
      </main>
    </>
  )
}