import { Droppable } from "react-beautiful-dnd";
import { useTheme } from "../../hooks/useTheme";
import { TodoProps } from "../../pages/Home"
import { Todo } from "../Todo"
import styles from "./styles.module.scss"
interface TodoListProps {
  todos: TodoProps[];
  handleMarkAsCompleted: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
}

export const TodoList = ({ todos, handleMarkAsCompleted, handleDeleteTodo }: TodoListProps) => {
  const { themeName } = useTheme();
  return (
    <Droppable droppableId={"todo"} isCombineEnabled>
      {(provided) => {
        return (
          <div ref={provided.innerRef}
            {...provided.droppableProps}
            className={`${styles.container} ${themeName === "light" ? styles.light : styles.dark}`}
          >
            {
              todos.map((todo, index) => (
                <Todo
                  key={todo.id}
                  index={index}
                  todo={todo}
                  handleMarkAsCompleted={handleMarkAsCompleted}
                  handleDeleteTodo={handleDeleteTodo}
                />
              ))
            }
            {provided.placeholder}
          </div>
        )
      }}
    </Droppable>

  )
}