import React from 'react';
import styles from './DownloadButton.module.scss';

export default function DownloadButton() {
  return (
    <a href="/CV-20:03:2023 - copie.pdf" download className={styles.downloadLink}>
      <button className={styles.downloadButton}>Download Resume</button>
    </a>
  );
}