import { useEffect, useState } from "react";
import useSheetEditor, { SheetColumns, SheetRows } from "../../core/sheets/hooks/useSheetEditor";
import useDebounce from "../../utils/hooks/useDebounce";

type Props = {
  columns: SheetColumns;
  rows: SheetRows;
  updateRowCell: ReturnType<typeof useSheetEditor>["updateRowCell"];
};

const Rows = (props: Props) => {
  const { updateRowCell } = props;

  const rows = props.rows ?? [];
  const columns = props.columns ?? [];

  return (
    <tbody className="bg-white">
      {rows.map((row) => {
        const cells = row.cells ?? [];
        return (
          <tr key={row.index} className="border-solid border-slate-200 border-2">
            {columns.map((column, i) => {
              const cell = cells.find((c) => c.columnKey === column.key);

              return (
                <RowCell
                  key={`${column.key}_${i}`}
                  initialValue={cell?.value ?? ""}
                  valueType={column?.valueType}
                  onChange={(value) => updateRowCell({ rowIndex: row.index, columnKey: column.key, value })}
                />
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

type RowCellProps = {
  initialValue: string;
  onChange: (v: string) => void;
  valueType?: string | null;
};

const RowCell = (props: RowCellProps) => {
  const { initialValue, onChange, valueType } = props;

  const [value, setValue] = useState<string>(initialValue);
  const debouncedValue = useDebounce(value, 400);

  useEffect(() => {
    if (initialValue !== debouncedValue) {
      onChange(debouncedValue);
    }
  }, [initialValue, debouncedValue]);

  const inputType = valueType === "number" ? "number" : "text";

  return (
    <td className=" overflow-hidden border-solid border-slate-200 border-2">
      <input className="p-2 w-full " type={inputType} value={value} onChange={(e) => setValue(e.target.value)} />
    </td>
  );
};

export default Rows;
