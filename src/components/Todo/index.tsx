import { TodoProps } from "../../pages/Home";
import check from '../../assets/icon-check.svg'
import cross from '../../assets/icon-cross.svg'
import styles from "./styles.module.scss"
import { useTheme } from "../../hooks/useTheme";
interface TodoComponentProps {
  todo: TodoProps;
  handleMarkAsCompleted: (id: string) => void;
  handleDeleteTodo: (id: string) => void;

}

export const Todo = ({ todo, handleMarkAsCompleted, handleDeleteTodo }: TodoComponentProps) => {
  const { themeName} = useTheme();
  return (
    <div className={`${styles.container} ${themeName === "light"? styles.light: styles.dark}`}>
      <button onClick={() => handleMarkAsCompleted(todo.id)} className={todo.completed ? styles.colored: ""}>
        {
          <div className={todo.completed ? styles.checked : styles.unchecked}> </div>
        }
      </button>
      <p className={todo.completed ? styles.completed: ""}>{todo.text}</p>
      <button className={styles.cross} onClick={() => handleDeleteTodo(todo.id)}>
        <img src={cross} alt="cross" />
      </button>
    </div>
  )
}