import { TodoProps } from "../../pages/Home"
import { Todo } from "../Todo"
import styles from "./styles.module.scss"
interface TodoListProps {
  todos: TodoProps[];
  handleMarkAsCompleted: (id: number) => void;
  handleDeleteTodo: (id: number) => void;
}

export const TodoList = ({todos, handleMarkAsCompleted, handleDeleteTodo}: TodoListProps) => {
  return (
    <div className={styles.container}>
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} handleMarkAsCompleted={handleMarkAsCompleted} handleDeleteTodo={handleDeleteTodo}/>
      ))}
    </div>
  )
}