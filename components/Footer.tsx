import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>Bijin Beyond Borders</div>
      <ul className={styles.links}>
        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        <li><a href="mailto:hello@bijinbeyondborders.com">Contact</a></li>
      </ul>
    </footer>
  );
}
