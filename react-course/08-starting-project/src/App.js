import { useState } from "react";
import AddUser from "./components/Users/AddUser";
import UserList from "./components/Users/UserList";
const usersListDefault = [
  { id: 1, username: "Miquel", age: 24 },
  { id: 2, username: "Joan", age: 25 },
  { id: 3, username: "Bernat", age: 26 },
];
function App() {
  const [usersList, setUsersList] = useState([...usersListDefault]);

  const addUserHandler = (username, age) => {
    const tempUser = { id: usersList.length + 1, username: username, age: age };

    setUsersList((usersList) => {
      return [...usersList, tempUser];
    });
  };
  return (
    <div>
      <AddUser onAddUser={addUserHandler} />
      <UserList users={usersList} />
    </div>
  );
}

export default App;
