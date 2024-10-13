import { gql } from "@apollo/client";

const getTaskList = gql`
  query {
    getTasksList {
      title
      description
      priorityLv
      isComplete
      startDate
      finishDate
      index
      date
      id
    }
  }
`;

export const graphqlQueries = { getTaskList }