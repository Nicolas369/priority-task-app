import { useState } from "react";
import LongCardItem from "../../components/long-card-item";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const styles: any = { // style={styles.main} 
  main: {
    width: "50vw",
    display: "flex",
    height: "500px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  }
};

const TaskPage = ({ tasksList }: { tasksList: any[] }) => {

  const [tasks, setTasks] = useState(tasksList); // this will be redux.

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };

  return (
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={styles.container}>
        <div style={styles.main}>
          <Droppable droppableId="droppableId1">
            
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>

                {tasks.map((task, i) => (
                  
                  <Draggable
                    key={Math.random()}
                    draggableId={task.id.toString()}
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
        </div>
      </div>
    </DragDropContext>
  );
};

export default TaskPage;
