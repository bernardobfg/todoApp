import { TodoProps } from "../../pages/Home";
import cross from '../../assets/icon-cross.svg'
import styles from "./styles.module.scss"
import { useTheme } from "../../hooks/useTheme";
import { Draggable } from "react-beautiful-dnd";
interface TodoComponentProps {
  todo: TodoProps;
  index: number;
  handleMarkAsCompleted: (id: string) => void;
  handleDeleteTodo: (id: string) => void;

}

export const Todo = ({ todo,index, handleMarkAsCompleted, handleDeleteTodo }: TodoComponentProps) => {
  const { themeName } = useTheme();
  return (
    <Draggable  index={index} draggableId={todo.id}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            
            className={`${styles.container} ${themeName === "light" ? styles.light : styles.dark}`}
          >
            <button onClick={() => handleMarkAsCompleted(todo.id)} className={todo.completed ? styles.colored : ""}>
              {
                <div className={todo.completed ? styles.checked : styles.unchecked}> </div>
              }
            </button>
            <p
              className={todo.completed ? styles.completed : ""}
              {...provided.dragHandleProps}
            >
              {todo.text}
            </p>
            <button className={styles.cross} onClick={() => handleDeleteTodo(todo.id)}>
              <img src={cross} alt="cross" />
            </button>
          </div>
        )}
    }
    </Draggable>
  )
}