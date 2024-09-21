import { useEffect } from "react";
import TaskPage from "./tasks-page/tasks-page";
import { useTasksListSelector } from "../store/selectors/tasks-selector";
import { useDispatch } from "react-redux";
import { Task } from "../definitions/redux-definitions";
import { AppDispatch } from "../store";
import { taskGraphQL_Query } from "../http/graphql/graphqlAsyncThunks";
import { tasksREST_GET } from "../http/axios-rest/axiosAsyncThunks";

const styles: any = {
  main: {
    width: "100vw",
    height: "100vh",
    margin: "0px",
    padding: "0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "blueviolet",
    color: "#ffffff"
  }
}

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const tasksListRedux: Task[] = useTasksListSelector();

  useEffect(() => { 
    dispatch(tasksREST_GET.fetchTasksList()); 
    // dispatch(taskGraphQL_Query.getTasksList());
    
  }, []);

  return (
    <div style={styles.main}>
      <TaskPage tasksList={tasksListRedux} />
    </div>
  );
}

export default App;
