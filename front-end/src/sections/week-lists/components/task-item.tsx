import { Draggable } from "react-beautiful-dnd";
import { Task } from "../../../definitions/redux-definitions";
import { ContainerComponent } from "../../../components/container-component";
import { Box } from "@mui/material";

export const TaskItem = ({
  task,
  index,
  responsibility
}: {
  task: Partial<Task>;
  index: number;
  responsibility: any;
}) => {

    // [ ] make action click for select the task 
    const containerStyles = { height: "fit-content", marginBottom: "10px" }


    const DraggableComponent = ({children}: any) => (
    <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
        {(provided) => (
          <div ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            >
                {children}
          </div>
        )}
      </Draggable>
    );


  return (
    <>
      <DraggableComponent>
            <ContainerComponent
              sx={containerStyles}
              responsibility={responsibility}
            >
              <Box sx={{ maxHeight: "50px", width: "100%" }}>{task.title}</Box>
            </ContainerComponent>      
      </DraggableComponent>
    </>
  );
};
