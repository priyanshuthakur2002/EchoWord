import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src="/logo.png" width={280} height={44} alt="logo" />
          </Link>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navLinks}>
            <li>
              <Link href="/" className={styles.link}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/" className={styles.link}>
                AI Voices
              </Link>
            </li>
            <li>
              <Link href="/" className={styles.link}>
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/" className={styles.link}>
                Contact
              </Link>
            </li>
          </ul>
          <div className={styles.btns}>
            <button className={`${styles.ctaBtn} ${styles.loginBtn}`}>
              Log in
            </button>
            <button className={`${styles.ctaBtn} ${styles.registerBtn}`}>
              Register
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
