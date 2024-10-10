import { CSSProperties, ReactElement } from "react";
import { Task } from "./redux-definitions";
import { ColorResponsibilityType } from "../theme/style";

export type Styles = {
  [key: string]: CSSProperties;
};

export interface ActionButtonInterface {
  action: () => void;
  description: string;
  disabled?: boolean;
  variant?: "contained" | "text" | "outlined";
  responsibility?: ColorResponsibilityType;
}

export interface DisplayTaskInterface {
  taskSelected: Task;
}

export interface InputTaskInterface {
  task: Task;
  taskSubmit: (task: Task) => void;
}

export interface TaskItemInterface {
  task: Task;
}

export interface ModalSectionInterface {
  displayComponent: ReactElement;
  secondaryActions: ReactElement[];
}

export interface TaskEntryInterface {
  taskSelected: Task | undefined;
  lastTaskOrder: number;
  isUpdate: boolean;
  isAdd: boolean;
  onSubmit: (task: Task) => void;
}

export interface TaskListSectionInterface {
  tasksList: Task[];
  emitTaskList: (taskList: Task[]) => void;
}