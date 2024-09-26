import { useEffect, useState } from "react";
import { TaskListSection } from "./tasks-list/tasks-list";
import { useSelectLastOrder, useSelectSelectedTask, useTaskListSelector } from "../store/selectors/tasks-selector";
import { Task } from "../definitions/redux-definitions";
import { useHttp } from "../hooks/useHttp";
import { ModalSection } from "./modal/modal-component";
import { TaskEntryComponent } from "./task-entry/task-entry";
import { ActionButtonComponent } from "../components/action-button";
import { useLocalState } from "../hooks/useLocalState";
import { Styles } from "../definitions/pages-definitions";

const styles: Styles = {
  main: {
    width: "100vw",
    height: "100vh",
    margin: "0px",
    padding: "0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blueviolet",
    color: "#ffffff"
  },
  taskList: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
}

export const TaskAppMainSection = () => {
  const tasksListRedux: Task[] = useTaskListSelector();
  const taskSelected = useSelectSelectedTask();
  const lastTaskOrder = useSelectLastOrder();

  const [isUpdateTask, setIsUpdateTask] = useState(false);
  const [isAddTask, setIsAddTask] = useState(false);
  
  const { getTaskList, updateTaskListOrder, deleteTask, updateTask, addTask } = useHttp();
  const { selectTask, toggleHttpLibrary, isAxios } = useLocalState();
  
  useEffect(() => { getTaskList() }, []);

  const closeModalAction = () => {
    setIsAddTask(() => false);
    setIsUpdateTask(() => false);
    selectTask("");
  }

  const markTaskAsDoneAction = () => {
    updateTask({ ...taskSelected!, isComplete: (!taskSelected?.isComplete)});
  }

  const updateTaskAction = () => setIsUpdateTask(() => !isUpdateTask);

  const deleteTaskAction = () => {
    if (taskSelected) {
      deleteTask(taskSelected?.id!);
      closeModalAction();
    }
  };

  const secondaryActions = [
    <ActionButtonComponent 
      action={closeModalAction} 
      description="Close"
    />,
    <ActionButtonComponent
      action={markTaskAsDoneAction}
      description={
        taskSelected?.isComplete ? "re-open" : "Mark as Done"
      }
      disabled={isAddTask}
    />,
    <ActionButtonComponent
      action={updateTaskAction}
      description="update"
      disabled={isAddTask || taskSelected?.isComplete}  
    />,
    <ActionButtonComponent
      action={deleteTaskAction}
      description="delete"
    />
  ];

  const onTaskEntrySubmit = (task: Task) => {
    isUpdateTask && updateTask(task);
    isAddTask && addTask(task);
    closeModalAction();
  }

  const openModal = (!!taskSelected || isAddTask);

  return (
    <div style={styles.main}>
        { openModal && 
          <ModalSection
            displayComponent={
              <TaskEntryComponent 
                taskSelected={taskSelected}
                lastTaskOrder={lastTaskOrder}
                onSubmit={onTaskEntrySubmit} 
                isUpdate={isUpdateTask} 
                isAdd={isAddTask} 
              />}
            secondaryActions={secondaryActions}
          />
        }
      <div style={styles.taskList}>
        <p>currently using: {isAxios ? "Axios" : "GraphQl"}</p>
        <div>
          <ActionButtonComponent 
            action={toggleHttpLibrary} 
            description={(`change to ${!isAxios ? "Axios" : "GraphQl"}`)}
          />
          <ActionButtonComponent 
            action={() => setIsAddTask(true)}
            description={"Add Task "}
          />
        </div>
        <TaskListSection tasksList={tasksListRedux} emitTaskList={updateTaskListOrder}/>
      </div>
    </div>
  );
}
