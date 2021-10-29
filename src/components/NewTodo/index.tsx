import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import styles from "./styles.module.scss"

interface NewTodoProps{
  handleAddTodo: (text: string) => void;
}




export const NewTodo = ({ handleAddTodo }: NewTodoProps) => {
  const { themeName} = useTheme();
  const [text, setText] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (text.trim().length === 0) {
      return;
    }
    e.preventDefault();
    handleAddTodo(text);
    setText("");
  };

  
  return (
    <div className={`${styles.container} ${themeName === "light"? styles.light: styles.dark}`}>
      <span></span>
      <form onSubmit={onSubmit} >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add Todo"

        />
      </form>
    </div>
  );
};
