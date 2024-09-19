import { useSelector } from "react-redux";
import { RootState } from "../index";

export const useTasksListSelector = () => useSelector((store: RootState) => store.tasks.list);
