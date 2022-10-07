import { MutationHookOptions, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { CreateSheet, CreateSheetVariables } from "./types/CreateSheet";

const CREATE_SHEET_MUTATION = gql`
  mutation CreateSheet($input: CreateSheetInput) {
    createSheet(input: $input) {
      id
      name
      updatedAt
      createdAt
    }
  }
`;

const useCreateSheetMutation = (options?: MutationHookOptions<CreateSheet, CreateSheetVariables>) =>
  useMutation<CreateSheet, CreateSheetVariables>(CREATE_SHEET_MUTATION, options);

export default useCreateSheetMutation;
