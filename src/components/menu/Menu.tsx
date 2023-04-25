import React, { useState } from 'react';
import styles from './Menu.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

function Menu() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const namesAndLinkes = [
    { name: 'Home', link: '/' },
    { name: 'Chatbot', link: '/chatbot' },
    { name: 'Career', link: '/career' }
  ];

  return (
    <nav>
      <ul
        className={clsx(
          styles.menu_container,
          mobileOpen ? styles.menu_open : null
        )}
      >
        {namesAndLinkes.map((nameAndLink, index) => {
          return (
            <li key={index} className={styles.menu_li}>
              <Link href={nameAndLink.link} className={clsx(
                    router.pathname === nameAndLink.link
                      ? styles.mnu_path_select
                      : styles.menu_path
                  )}
                  onClick={() => setMobileOpen(!mobileOpen)}
                  >                  
                  {nameAndLink.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <hr className={styles.menu_separation_line} />
      <img
        src="/menu.png"
        alt="menu icon"
        className={styles.menu_icon}
        onClick={() => setMobileOpen(!mobileOpen)}
      />
      <img
        src="/effacer.png"
        alt="menu close icon"
        className={clsx(
          styles.menu_close_icon,
          mobileOpen ? styles.menu_open : null
          )}
        onClick={() => setMobileOpen(!mobileOpen)}
      />
    </nav>
  );
}

export default Menu;