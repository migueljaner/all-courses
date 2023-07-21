import Card from "../UI/Card";
import style from "./UserList.module.css";

const UserList = (props) => {
  return (
    <Card className={style.users}>
      <ul>
        {props.users?.map((e) => (
          <li className={style.list} key={e.id}>
            {e.username} ({e.age} year old)
          </li>
        ))}
      </ul>
    </Card>
  );
};
export default UserList;
