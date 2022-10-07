import { useCallback } from "react";
import { UpdateSheetInput } from "../../../graphql/hooks/types/globalTypes";
import { Sheet } from "../../../graphql/hooks/types/Sheet";
import useSheetQuery from "../../../graphql/hooks/useSheetQuery";
import useUpdateSheetMutation from "../../../graphql/hooks/useUpdateSheetMutation";

export type SheetColumns = NonNullable<Sheet["sheet"]>["columns"];
export type SheetRows = NonNullable<Sheet["sheet"]>["rows"];
export type SheetRowsCell = NonNullable<NonNullable<Sheet["sheet"]>["rows"]>[0]["cells"][0];

type Params = {
  sheetId?: string;
};

type AddColumnParams = {
  columnName: string;
  valueType: "text" | "number";
};

type UpdateRowCellParams = {
  rowIndex: number;
  value: string;
  columnKey: number;
};

const useSheetEditor = (params: Params) => {
  const { sheetId } = params;
  const { data, loading, error, refetch } = useSheetQuery({ variables: { id: sheetId as string }, skip: !sheetId });
  const [mutateUpdateSheet, mutationResult] = useUpdateSheetMutation();

  const sheet = data?.sheet;

  const columns = sheet?.columns ?? [];
  const rows = sheet?.rows ?? [];

  const addColumn = useCallback(
    (params: AddColumnParams) => {
      const { columnName, valueType } = params;
      if (!sheet) {
        console.warn(`Attempted to add a new column without a sheet`);
        return;
      }
      if (loading) {
        return;
      }

      const nextColumnKey = columns?.length ?? 0;
      const updatedColumns = [
        ...(sheet.columns?.map(({ key, name, valueType }) => ({ key, name, valueType })) ?? []),
        { name: columnName, valueType, key: nextColumnKey },
      ];

      const input: UpdateSheetInput = { id: sheet.id, columns: updatedColumns };

      mutateUpdateSheet({ variables: { input } }).then(() => refetch?.());
    },
    [sheet, loading, mutateUpdateSheet, refetch]
  );

  const addRow = useCallback(() => {
    if (!sheet) {
      console.warn(`Attempted to add a new row without a sheet`);
      return;
    }

    if (loading) {
      return;
    }

    const nextRowIndex = sheet?.rows?.length ?? 0;
    const rows = [
      ...(sheet.rows?.map(({ index, cells }) => ({ index, cells: cells.map(({ columnKey, value }) => ({ columnKey, value })) })) ?? []),
      { index: nextRowIndex, cells: [] },
    ];
    const input = { id: sheet.id, rows };

    mutateUpdateSheet({ variables: { input } }).then(() => refetch?.());
  }, [sheet, loading, mutateUpdateSheet, refetch]);

  const updateRowCell = useCallback(
    (params: UpdateRowCellParams) => {
      if (!sheet) {
        console.warn(`Attempted to add a new row without a sheet`);
        return;
      }

      if (loading) {
        return;
      }

      const { rowIndex, value, columnKey } = params;
      const rowsUpdate = rows.map(({ index, cells }) => ({ index, cells: cells.map(({ columnKey, value }) => ({ columnKey, value })) }));
      const updateRow = rowsUpdate.find((row) => row.index === rowIndex);
      if (updateRow) {
        const cell = updateRow.cells.find((c) => c.columnKey === columnKey);
        if (cell) {
          cell.value = value;
        } else {
          updateRow.cells.push({ value, columnKey });
        }
        mutateUpdateSheet({ variables: { input: { id: sheet.id, rows: rowsUpdate } } });
      }
    },
    [sheet, loading, mutateUpdateSheet]
  );

  return { loading, error: error ?? mutationResult.error, sheet, addColumn, addRow, updateRowCell };
};

export default useSheetEditor;
