import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { Header } from "../../components/Header.tsx";
import { NewTodo } from "../../components/NewTodo";
import { TodoList } from "../../components/TodoList";
import { useTheme } from "../../hooks/useTheme";
import styles from "./styles.module.scss"

export type TodoProps = {
  id: string;
  text: string;
  completed: boolean;
}

type handleDragProps = {
  destination: {
    droppabledId: string,
    index: number
  };
  source: {
    droppabledId: string,
    index: number
  }
}

export const Home = () => {

  const { themeName } = useTheme();

  const [allTodos, setAllTodos] = useState<TodoProps[]>([]);
  const [selectedTodos, setSelectedTodos] = useState<TodoProps[]>([]);
  const [todoType, setTodoType] = useState<string>("all");

  useEffect(() => {
    if (todoType === "all") {
      setSelectedTodos(allTodos)
    }
    if (todoType === "completed") {
      setSelectedTodos(allTodos.filter(todo => todo.completed))
    }
    if (todoType === "active") {
      setSelectedTodos(allTodos.filter(todo => !todo.completed))
    }
  }, [todoType, allTodos])

  const handleAddTodo = (text: string) => {
    const newTodo: TodoProps = {
      id: uuidv4(),
      text,
      completed: false,
    };
    setAllTodos([...allTodos, newTodo]);
  };

  const handleMarkAsCompleted = (id: string) => {
    const newTodos = allTodos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setAllTodos(newTodos);
  }
  const handleDeleteTodo = (id: string) => {
    const newTodos = allTodos.filter(todo => todo.id !== id);
    setAllTodos(newTodos);
  }

  const handleClearCompleted = () => {
    const newTodos = allTodos.filter(todo => !todo.completed);
    setAllTodos(newTodos);
  }

  const handleDragTodo = ({destination, source}: handleDragProps) => {
    if (!destination)
      return;
    if (destination.index === source.index)
      return;
    const todoCopy = allTodos[source.index]
    setAllTodos(prev => {
      prev = [ ...prev ]
      prev.splice(source.index, 1)
      prev.splice(destination.index, 0, todoCopy)
      return prev

    })
    
  }

  return (
    <div className={`${styles.container} ${themeName === "light" ? styles.light : styles.dark}`}>
      <Header />
      <div>
        <NewTodo handleAddTodo={handleAddTodo} />
        <DragDropContext onDragEnd={(e) => handleDragTodo(e)}>
          <TodoList todos={selectedTodos} handleMarkAsCompleted={handleMarkAsCompleted} handleDeleteTodo={handleDeleteTodo} />
        </DragDropContext>

        <div className={`${styles.resume}  ${themeName === "light" ? styles.light : styles.dark}`}>
          <small>{allTodos.filter(todo => !todo.completed).length} item(s) left</small>
          <div>
            <button className={todoType === "all" ? styles.selected : ""} onClick={() => setTodoType("all")}>All</button>
            <button className={todoType === "active" ? styles.selected : ""} onClick={() => setTodoType("active")}>Active</button>
            <button className={todoType === "completed" ? styles.selected : ""} onClick={() => setTodoType("completed")}>Completed</button>
          </div>
          <button onClick={handleClearCompleted}>Clear Completed</button>
        </div>
        <div className={`${styles.smallDevicesButtons}  ${themeName === "light" ? styles.light : styles.dark}`}>
          <button className={todoType === "all" ? styles.selected : ""} onClick={() => setTodoType("all")}>All</button>
          <button className={todoType === "active" ? styles.selected : ""} onClick={() => setTodoType("active")}>Active</button>
          <button className={todoType === "completed" ? styles.selected : ""} onClick={() => setTodoType("completed")}>Completed</button>
        </div>
      </div>
    </div>
  );
};
