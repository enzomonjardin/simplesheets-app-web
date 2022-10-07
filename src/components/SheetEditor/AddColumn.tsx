import { useState } from "react";
import styled from "styled-components";
import useSheetEditor from "../../core/sheets/hooks/useSheetEditor";

type AddColumnProps = {
  addColumn: ReturnType<typeof useSheetEditor>["addColumn"];
};

const AddColumn = (props: AddColumnProps) => {
  const { addColumn } = props;
  const [newColumnName, setNewColumnName] = useState("");
  const [newColumnValueType, setNewColumnValueType] = useState<"text" | "number">("text");

  const addNewColumn = () => {
    if (newColumnName) {
      addColumn({ columnName: newColumnName, valueType: newColumnValueType });
      setNewColumnName("");
    }
  };

  return (
    <Layout>
      <div className="mr-4 font-semibold">Add column: </div>
      <input
        className="border-solid border-slate-600 p-2"
        type="text"
        value={newColumnName}
        onChange={(e) => setNewColumnName(e.target.value)}
        maxLength={26}
        placeholder="New column name"
      />
      <ValueTypeSelectorLayout>
        <ValueTypeSelector first selected={newColumnValueType === "text"} onClick={() => setNewColumnValueType("text")}>
          Text
        </ValueTypeSelector>
        <ValueTypeSelector selected={newColumnValueType === "number"} onClick={() => setNewColumnValueType("number")}>
          Number
        </ValueTypeSelector>
      </ValueTypeSelectorLayout>
      <button
        disabled={!newColumnName}
        className="bg-teal-700 shadow-sm rounded-sm py-2 px-8 font-bold ml-4 hover:opacity-70 text-slate-200 disabled:opacity-40 ease-out duration-200"
        onClick={addNewColumn}
      >
        + Add column
      </button>
    </Layout>
  );
};

const Layout = styled.div`
  position: sticky;
  left: 4px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 24px;
`;

const ValueTypeSelectorLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 8px;
`;

type ValueTypeSelectorProps = {
  selected: boolean;
  first?: boolean;
};

const ValueTypeSelector = styled.div.attrs<ValueTypeSelectorProps>((p) => {
  const baseClassName = `ease-out duration-200 shadow-sm`;
  const selectedClassnames = p.selected ? "bg-teal-500" : "bg-teal-700";
  const roundedClassNames = p.first ? "rounded-l-sm" : "rounded-r-sm";

  return { className: `${baseClassName} ${selectedClassnames}  ${roundedClassNames}}` };
})<ValueTypeSelectorProps>`
  height: 100%;
  width: 88px;
  cursor: pointer;
  padding: 8px;

  text-align: center;
  font-weight: bold;
  color: #efefef;
  user-select: none;
`;

export default AddColumn;
