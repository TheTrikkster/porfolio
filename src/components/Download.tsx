import styles from './DownloadButton.module.css';

export default function DownloadButton() {
  return (
    <a href="/CV-20:03:2023 - copie.pdf" download className={styles.downloadLink}>
      <button className={styles.downloadButton}>Download my CV</button>
    </a>
  );
}