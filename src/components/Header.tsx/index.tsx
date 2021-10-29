import styles from "./styles.module.scss"
import sun from "../../assets/icon-sun.svg"
export const Header = () => {
  return (
    <header className={styles.container}>
      <div>
        <h1>TODO</h1>
        <img src={sun} alt="theme" />
      </div>
    </header>
  );
};