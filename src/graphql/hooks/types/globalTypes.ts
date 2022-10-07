/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateSheetInput {
  name?: string | null;
}

export interface SheetColumnInput {
  key: number;
  name?: string | null;
  valueType?: string | null;
}

export interface SheetRowCellInput {
  columnKey: number;
  value?: string | null;
}

export interface SheetRowInput {
  index: number;
  cells: SheetRowCellInput[];
}

export interface UpdateSheetInput {
  id: string;
  name?: string | null;
  columns?: (SheetColumnInput | null)[] | null;
  rows?: (SheetRowInput | null)[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
