import LongCardItem from "../../components/long-card-item";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { setTasksList } from "../../store/slices/task-slice";
import { Task } from "../../definitions/redux-definitions";

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

  const dispatch = useDispatch();

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(tasksList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(setTasksList(items));
  };

  return (
    <>
      {/* D&D */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={uuidv4()}>
          {(provided) => (
            <div style={styles.main} ref={provided.innerRef} {...provided.droppableProps}>

              {tasksList.map((task, i) => (
                
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
                      <LongCardItem item={task.title} />
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
