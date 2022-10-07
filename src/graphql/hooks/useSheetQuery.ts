import { QueryHookOptions, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Sheet, SheetVariables } from "./types/Sheet";

export const SHEET_QUERY = gql`
  query Sheet($id: ID!) {
    sheet(id: $id) {
      id
      name
      createdAt
      updatedAt
      columns {
        key
        name
        valueType
      }
      rows {
        index
        cells {
          columnKey
          value
        }
      }
    }
  }
`;

const useSheetQuery = (options: QueryHookOptions<Sheet, SheetVariables>) => useQuery<Sheet, SheetVariables>(SHEET_QUERY, options);

export default useSheetQuery;
