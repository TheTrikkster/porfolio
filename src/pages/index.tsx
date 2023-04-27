import Head from 'next/head';
import { useState } from 'react';
import styles from '@components:./components/styles/Home.module.scss';
import clsx from 'clsx';
import Chatbot from '../components/chatbot/Chatbot';
import DownloadButton from '../components/downlaod/Download';
import { techs, leftSideSkills, rightSideSkills } from '../components/data';

export default function Home() {
  const [showCompetences, setShowCompetences] = useState(false);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.home_container}>
        <header className={styles.home_header_container}>
            <h1>Developper Front-end React & Next TypeScript</h1>
            <p>Hello, I am Doukhaev Israil. A passionate developer, discover my portfolio that will seduce you.</p>
          </header>
        <main className={styles.home_main_container}>
          <div className={styles.home_container_of_image_and_text}>
            <div className={styles.home_left_side_container}>
              <p className={styles.home_left_side_p}>
                Doukhaev Israil is a passionate and self-taught {techs.map((tech, index) => <><span key={index} style={{color: tech.color}}> {tech.name}</span> {tech.part}</>)}
                developer, having started programming at the age of 16. He has a varied professional experience, working on various projects.
                Israil stands out for its excellent understanding of key concepts and its rigorous application of good development practices. 
                In addition to his technical skills, Israil is proactive and actively participates in team meetings and always up to date with the latest trends in React development.
              </p>
              <DownloadButton />
            </div>
            <div className={styles.home_right_side_container}>
              <img className={clsx(
                styles.home_my_image, 
                showCompetences ? `${styles.home_change_opacity} ${styles.home_image_zoom}` : null)} 
                src="/ISRAIL.jpg" alt='image of Doukhaev Israil' 
                onMouseOver={() => setShowCompetences(true)} onMouseOut={() => setShowCompetences(false)} 
              />
            </div>
          </div>

          <div className={styles.home_competences_container} onMouseOver={() => setShowCompetences(true)}>
              <h4 className={clsx(styles.home_skills_title, showCompetences ? styles.home_competences_show : null)}>Skills</h4>
              <div className={clsx(styles.home_competences, showCompetences ? styles.home_competences_show : null)}>
                <div className={styles.home_left_side_skills}>
                  {
                    leftSideSkills.map((skill, index) => {
                      return (
                        <div key={index}>
                          {skill.name} <br/><meter min={0} max={100} low={30} high={70} optimum={80} value={skill.value}/>
                        </div>
                      )
                    })
                  }
                </div>
                <div>
                  {
                    rightSideSkills.map((skill, index) => {
                      return (
                        <div key={index}>
                          {skill.name} <br/><meter min={0} max={100} low={30} high={70} optimum={80} value={skill.value}/>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
        </main>
        <Chatbot />
      </div>
    </>
  )
}