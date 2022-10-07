/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateSheetInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateSheet
// ====================================================

export interface CreateSheet_createSheet {
  __typename: "Sheet";
  id: string;
  name: string | null;
  updatedAt: any | null;
  createdAt: any | null;
}

export interface CreateSheet {
  createSheet: CreateSheet_createSheet | null;
}

export interface CreateSheetVariables {
  input?: CreateSheetInput | null;
}
