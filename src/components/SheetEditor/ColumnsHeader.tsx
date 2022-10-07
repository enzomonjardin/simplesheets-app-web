import { SheetColumns } from "../../core/sheets/hooks/useSheetEditor";

type Props = {
  columns: SheetColumns;
};

const ColumnsHeader = (props: Props) => {
  const { columns } = props;

  return (
    <thead>
      <tr>
        {(columns ?? []).map(({ key, name, valueType }) => (
          <th key={key} className="border-solid border-2 border-teal-900 bg-slate-200 text-gray-800 text-left pl-2 py-2">
            <div className="flex flex-row space-between px-4 ">
              <div className="flex-1">{name}</div>
              <div className="select-none opacity-40 ml-auto"> {valueType === "text" ? "Aa" : "#"}</div>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default ColumnsHeader;
