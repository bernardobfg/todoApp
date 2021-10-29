import styles from "./styles.module.scss"
import sun from "../../assets/icon-sun.svg"
import moon from "../../assets/icon-moon.svg"
import { useTheme } from "../../hooks/useTheme";
export const Header = () => {
  const {themeName, changeTheme} = useTheme()
  return (
    <header className={`${styles.container} ${themeName === "light"? styles.light: styles.dark}`}>
      <div>
        <h1>TODO</h1>
        <img src={themeName === "light"? moon: sun} alt="theme" onClick={()=>changeTheme(themeName === "light" ?"dark": "light")}/>
      </div>
    </header>
  );
};