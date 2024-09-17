import TaskPage from "./tasks-page/tasks-page";

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

  const mokedTask = [
    {title: "task-1", id: 11},
    {title: "task-2", id: 12},
    {title: "task-3", id: 13},
    {title: "task-4", id: 14},
    {title: "task-5", id: 15}
  ];

  return (
    <div style={styles.main}>
      <TaskPage tasksList={mokedTask} />
    </div>
  );
}

export default App;
