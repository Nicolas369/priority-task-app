import { Draggable } from "react-beautiful-dnd";
import { Task } from "../../../definitions/redux-definitions";
import { ContainerComponent } from "../../../components/container-component";
import { Box, Typography } from "@mui/material";

export const TaskItem = ({
  task,
  index,
  responsibility
}: {
  task: Partial<Task>;
  index: number;
  responsibility: any;
}) => {

  // [ ] make action click for task selection
  const containerStyles = { height: "fit-content", marginBottom: "10px" }

  const DraggableComponent = ({children}: any) => (
    <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
      {(provided) => (
        <div ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={provided.draggableProps.style}
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
              <Box sx={{ height: "fit-content", width: "100%" }}>
                <div>
                  <Typography>{task.title}</Typography>
                  <Typography>{`${task.startDate} . ${task.finishDate }`}</Typography>
                </div>
              </Box>
            </ContainerComponent>      
      </DraggableComponent>
    </>
  );
};
