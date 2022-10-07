/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Sheet
// ====================================================

export interface Sheet_sheet_columns {
  __typename: "SheetColumn";
  key: number;
  name: string | null;
  valueType: string | null;
}

export interface Sheet_sheet_rows_cells {
  __typename: "SheetCell";
  columnKey: number;
  value: string | null;
}

export interface Sheet_sheet_rows {
  __typename: "SheetRow";
  index: number;
  cells: Sheet_sheet_rows_cells[];
}

export interface Sheet_sheet {
  __typename: "Sheet";
  id: string;
  name: string | null;
  createdAt: any | null;
  updatedAt: any | null;
  columns: Sheet_sheet_columns[] | null;
  rows: Sheet_sheet_rows[] | null;
}

export interface Sheet {
  sheet: Sheet_sheet | null;
}

export interface SheetVariables {
  id: string;
}
