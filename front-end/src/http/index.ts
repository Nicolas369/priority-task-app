import {
  GraphQLExtraReducer,
  taskGraphQL_Mutation,
  taskGraphQL_Query,
} from "./graphql/graphqlAsyncThunks";

export const httpExtraReducer = GraphQLExtraReducer;

export const HTTP = {
  addTask: taskGraphQL_Mutation.addTask,
  fetchTasksList: taskGraphQL_Query.getTasksList,
  updateTask: taskGraphQL_Mutation.updateTask,
  updateTasksListOrder: taskGraphQL_Mutation.updateTaskLIstOrder,
  deleteTask: taskGraphQL_Mutation.deleteTask,
};
