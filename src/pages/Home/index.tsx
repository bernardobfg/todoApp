import { useState } from "react";
import { Header } from "../../components/Header.tsx";
import { NewTodo } from "../../components/NewTodo";
import { TodoList } from "../../components/TodoList";
import styles from "./styles.module.scss"

export type TodoProps = {
  id: number;
  text: string;
  completed: boolean;
}


export const Home = () => {
  const [todos, setTodos] = useState<TodoProps[]>([]);

  const handleAddTodo = (text: string) => {
    const newTodo: TodoProps = {
      id: todos.length,
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const handleMarkAsCompleted = (id: number)  => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodos);
  }
  const handleDeleteTodo = (id: number) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  }
  return (
    <div className={styles.container}>
      <Header />
      <div>
        <NewTodo handleAddTodo={handleAddTodo}/>
        <TodoList todos={todos} handleMarkAsCompleted={handleMarkAsCompleted} handleDeleteTodo={handleDeleteTodo}/>
      </div>
    </div>
  );
};
