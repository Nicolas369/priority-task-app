import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { LongCardTaskItemComponent } from "../../components/long-card-item";
import { v4 as uuidv4 } from 'uuid';
import { Task } from "../../definitions/redux-definitions";
import { Styles, TaskListSectionInterface } from "../../definitions/pages-definitions";

const styles: Styles = {
  main: {
    width: "fit-content",
    padding: "10px",
    margin: "10px",
    display: "flex",
    height: "400px",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center",
    border: "solid 1px #ffffff",
    overflowY: "scroll",
  },
};

export const TaskListSection = ({ tasksList, emitTaskList }: TaskListSectionInterface) => {
  const sortedTasksList = [...tasksList].sort((a, b) => a.taskOrder - b.taskOrder );

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(sortedTasksList);
    const priorityLvRange = items[result.destination.index]
      ? items[result.destination.index].priorityLv
      : items[items.length -1].priorityLv;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, {...reorderedItem, priorityLv: priorityLvRange});
    const orderList: Task[] = items.map((task, i) => ({...task, taskOrder: i+1 }));

    emitTaskList(orderList);
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
                      <LongCardTaskItemComponent task={task} />
                    </div>
                  )}
                </Draggable>
              ))}
              
              {provided.placeholder} {/* Placeholder for spacing */}

            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

