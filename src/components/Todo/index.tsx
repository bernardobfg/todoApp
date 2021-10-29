import { TodoProps } from "../../pages/Home";
import check from '../../assets/icon-check.svg'
import cross from '../../assets/icon-cross.svg'
import styles from "./styles.module.scss"
interface TodoComponentProps {
  todo: TodoProps;
  handleMarkAsCompleted: (id: number) => void;
  handleDeleteTodo: (id: number) => void;

}

export const Todo = ({ todo, handleMarkAsCompleted, handleDeleteTodo }: TodoComponentProps) => {
  return (
    <div className={styles.container}>
      <button onClick={() => handleMarkAsCompleted(todo.id)}>
        {
          <div className={todo.completed ? styles.checked : styles.unchecked}> </div>
        }
      </button>
      <p>{todo.text}</p>
      <button className={styles.cross} onClick={() => handleDeleteTodo(todo.id)}>
        <img src={cross} alt="cross" />
      </button>
    </div>
  )
}