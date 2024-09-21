import LongCardItem from "../../components/long-card-item";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { Task } from "../../definitions/redux-definitions";
import { taskGraphQL_Mutation, taskGraphQL_Query } from "../../http/graphql/graphqlAsyncThunks";
import { AppDispatch } from "../../store";
import { tasksREST_POST } from "../../http/axios-rest/axiosAsyncThunks";
import { setTasksList } from "../../store/slices/task-slice";

type Styles = {
  main: any;
}

const styles: Styles = {
  main: {
    width: "fit-content",
    padding: "10px",
    margin: "10px",
    display: "flex",
    height: "500px",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center",
    border: "solid 1px #ffffff",
    overflowY: "scroll",
  },
};

const TaskPage = ({ tasksList }: { tasksList: Task[] }) => {
  const sortedTasksList = [...tasksList].sort((a, b) => a.taskOrder - b.taskOrder );

  const dispatch = useDispatch<AppDispatch>();

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(sortedTasksList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const orderList: Task[] = items.map((task, i) =>{ return({...task, taskOrder: i+1 })});

    dispatch(taskGraphQL_Mutation.updateTaskLIstOrder( orderList ));
    dispatch(setTasksList( orderList ));
  };

  return (
    <>
      {/* D&D */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={uuidv4()}>
          {(provided) => (
            <div style={styles.main} ref={provided.innerRef} {...provided.droppableProps}>

              {sortedTasksList.map((task, i) => (
                
                <Draggable
                  key={uuidv4()}
                  draggableId={`${task.id}`}
                  index={i}
                >
                
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <LongCardItem item={`${task.taskOrder}: >  ${task.title}`} />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default TaskPage;
