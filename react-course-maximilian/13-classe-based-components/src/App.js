import UserFinder from "./components/UserFInder";
import UsersContext from "./store/user-context";

function App() {
  const DUMMY_USERS = [
    { id: "u1", name: "Max" },
    { id: "u2", name: "Manuel" },
    { id: "u3", name: "Julie" },
  ];
  const UserContext = {
    users: DUMMY_USERS,
  };

  return (
    <UsersContext.Provider value={UserContext}>
      <UserFinder />
    </UsersContext.Provider>
  );
}

export default App;
