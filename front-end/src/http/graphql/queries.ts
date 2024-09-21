import { gql } from "@apollo/client";

const getTaskList = gql`
  query {
    getTasksList {
      title
      id
      description
      date
      priorityLv
      isComplete
    }
  }
`;

export const graphqlQueries = { getTaskList }