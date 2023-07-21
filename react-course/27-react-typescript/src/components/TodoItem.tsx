import React from "react";
import styles from "./TodoItem.module.css";

/* const TodoItem = (props: { id: number; text: string }) => {
  return <li key={props.id}>{props.text}</li>;
}; */

/* const TodoItem: React.FC<{ id: number; text: string }> = (props) => {
  return (
    <li key={props.id} className={styles.item}>
      {props.text}
    </li>
  );
}; */

const TodoItem: React.FC<{
  text: string;
  onClickDelete: () => void;
}> = ({ text, onClickDelete }) => {
  return (
    <li className={styles.item} onClick={onClickDelete}>
      {text}
    </li>
  );
};

export default TodoItem;
