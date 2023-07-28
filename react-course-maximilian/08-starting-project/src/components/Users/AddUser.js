import { useState } from "react";
import Card from "../UI/Card";
import styles from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState(" ");
  const [error, setError] = useState();

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };
  const ageChangeHandler = (event) => {
    console.log(event.target.valueAsNumber);

    if (!Number.isNaN(event.target.valueAsNumber)) {
      setEnteredAge(event.target.valueAsNumber);
    } else {
      setEnteredAge(" ");
    }
  };
  const addUserHandler = (ev) => {
    ev.preventDefault();
    console.log(+enteredAge);

    if (enteredUsername.trim().length === 0 || Number.isNaN(enteredAge)) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age!",
      });
      return;
    }
    if (Number.isNaN(+enteredAge) || +enteredAge === 0) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age!",
      });
      return;
    }

    props.onAddUser(enteredUsername, enteredAge);
    setEnteredAge("");
    setEnteredUsername("");
  };
  const onButtonHandler = (event) => {
    setError();
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onButtonClick={onButtonHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            onChange={usernameChangeHandler}
            value={enteredUsername}
          ></input>
          <label htmlFor="age">Age (years)</label>
          <input
            id="age"
            type="number"
            onChange={ageChangeHandler}
            value={enteredAge}
          ></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
