import { Draggable } from "react-beautiful-dnd";
import { ContainerComponent } from "../../../components/container-component";
import { Box, Typography } from "@mui/material";
import { TaskItemInterface } from "../../../definitions/sections-definitions";

export const TaskItem = (props: TaskItemInterface) => {
  const { task, index, responsibility } = props;

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
