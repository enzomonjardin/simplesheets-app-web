import { MutationHookOptions, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { UpdateSheet, UpdateSheetVariables } from "./types/UpdateSheet";
import { SHEET_QUERY } from "./useSheetQuery";

const UPDATE_SHEET_MUTATION = gql`
  mutation UpdateSheet($input: UpdateSheetInput!) {
    updateSheet(input: $input) {
      id
      name
      updatedAt
      createdAt
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

const useUpdateSheetMutation = (options?: MutationHookOptions<UpdateSheet, UpdateSheetVariables>) =>
  useMutation<UpdateSheet, UpdateSheetVariables>(UPDATE_SHEET_MUTATION, options);

export default useUpdateSheetMutation;
