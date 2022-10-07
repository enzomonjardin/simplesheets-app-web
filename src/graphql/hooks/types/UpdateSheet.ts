/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateSheetInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateSheet
// ====================================================

export interface UpdateSheet_updateSheet_columns {
  __typename: "SheetColumn";
  key: number;
  name: string | null;
  valueType: string | null;
}

export interface UpdateSheet_updateSheet_rows_cells {
  __typename: "SheetCell";
  columnKey: number;
  value: string | null;
}

export interface UpdateSheet_updateSheet_rows {
  __typename: "SheetRow";
  index: number;
  cells: UpdateSheet_updateSheet_rows_cells[];
}

export interface UpdateSheet_updateSheet {
  __typename: "Sheet";
  id: string;
  name: string | null;
  updatedAt: any | null;
  createdAt: any | null;
  columns: UpdateSheet_updateSheet_columns[] | null;
  rows: UpdateSheet_updateSheet_rows[] | null;
}

export interface UpdateSheet {
  updateSheet: UpdateSheet_updateSheet | null;
}

export interface UpdateSheetVariables {
  input: UpdateSheetInput;
}
