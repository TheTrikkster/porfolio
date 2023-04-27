import React from 'react'
import styles from './Footer.module.scss'

function Footer() {
  return (
    <footer>
      <hr />
      <div className={styles.footer_container}>
        <a href='https://www.linkedin.com/in/israil-doukhaev-61a41a218' className={styles.footer_icon}><img src="/linkedin.png" alt="icon of linkedin" className={styles.footer_icon}/></a>
        <a href='https://github.com/TheTrikkster/porfolio' className={styles.footer_icon}><img src="/github.png" alt="icon of github" className={styles.footer_icon} /></a>
        <p><a href='mailto:israilst67@gmail.com' className={styles.footer_email}>israilst67@gmail.com</a></p>
      </div>
    </footer>
  )
}

export default Footer