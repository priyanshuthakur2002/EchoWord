import styles from "./page.module.css";

export default function LoadingDots() {
  return (
    <div className={styles.overlay}>
      <div className={styles.loader}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  );
}
