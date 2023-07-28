import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use-http";

const NewTask = (props) => {
  const { loading, error, sendRequest: addTask } = useHttp();

  const enterTaskHandler = async (taskText) => {
    const createTask = (taskText, taskData) => {
      const generatedId = taskData.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };
      props.onAddTask(createdTask);
    };

    addTask({
      url: "https://react-post-50d48-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
      method: "POST",
      body: { text: taskText },
      headers: {
        "Content-Type": "application/json",
      },
      applyData: createTask.bind(null, taskText),
    });
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={loading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
