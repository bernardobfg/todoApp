import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Header } from "../../components/Header.tsx";
import { NewTodo } from "../../components/NewTodo";
import { TodoList } from "../../components/TodoList";
import styles from "./styles.module.scss"

export type TodoProps = {
  id: string;
  text: string;
  completed: boolean;
}


export const Home = () => {
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

  return (
    <div className={styles.container}>
      <Header />
      <div>
        <NewTodo handleAddTodo={handleAddTodo} />
        <TodoList todos={selectedTodos} handleMarkAsCompleted={handleMarkAsCompleted} handleDeleteTodo={handleDeleteTodo} />
        <div className={styles.resume}>
          <small>{allTodos.filter(todo => !todo.completed).length} item(s) left</small>
          <div>
            <button className={todoType === "all" ? styles.selected : ""} onClick={() => setTodoType("all")}>All</button>
            <button className={todoType === "active" ? styles.selected : ""} onClick={() => setTodoType("active")}>Active</button>
            <button className={todoType === "completed" ? styles.selected : ""} onClick={() => setTodoType("completed")}>Completed</button>
          </div>
          <button onClick={handleClearCompleted}>Clear Completed</button>
        </div>
        <div className={styles.smallDevicesButtons}>
          <button className={todoType === "all" ? styles.selected : ""} onClick={() => setTodoType("all")}>All</button>
          <button className={todoType === "active" ? styles.selected : ""} onClick={() => setTodoType("active")}>Active</button>
          <button className={todoType === "completed" ? styles.selected : ""} onClick={() => setTodoType("completed")}>Completed</button>
        </div>
      </div>
    </div>
  );
};
