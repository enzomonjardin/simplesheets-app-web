import { useParams } from "react-router-dom";
import useSheetEditor from "../../core/sheets/hooks/useSheetEditor";
import AddColumn from "./AddColumn";
import ColumnsHeader from "./ColumnsHeader";
import Rows from "./Rows";

const SheetEditor = () => {
  const params = useParams();
  const sheetIdParam = params.sheetId;

  const { sheet, addColumn, addRow, updateRowCell, loading, error } = useSheetEditor({ sheetId: sheetIdParam });

  if (loading || error) {
    return <Loader error={error?.message} />;
  } else if (!sheet) {
    return <Loader error={"Sheet not found"} />;
  }

  const columns = sheet.columns ?? [];
  const rows = sheet.rows ?? [];

  let sheetWidthClassName = "table-auto w-full";
  if (columns.length < 3) {
    sheetWidthClassName = `table-fixed ${columns.length < 2 ? "w-1/3" : "w-1/2"}`;
  }

  return (
    <>
      <header className="sticky top-0 z-50 fixed bg-emerald-800 shadow-md z-10 w- px-5 py-4 flex justify-between items-center text-white">
        <div>{sheet.name}</div>
        <div className="ml-auto select-none font-bold first-letter:mr-2">📄 simple sheets </div>
        <div className="select-none font-bold mx-6">|</div>
        <a className="select-none font-semibold hover:opacity-70 ease-in duration-200 " href="/">
          New sheet
        </a>
      </header>
      <main className="relative w-full h-full max-w- mx-auto p-4 pt-16 overflow-scroll">
        <AddColumn addColumn={addColumn} />
        {columns.length === 0 && <EmptyState />}
        <table className={`${sheetWidthClassName} rounded-md shadow-sm`}>
          <ColumnsHeader columns={columns} />
          <Rows columns={columns} rows={rows} updateRowCell={updateRowCell} />
        </table>
        <button
          className="bg-teal-700 shadow-sm my-4 rounded-sm py-2 px-8 font-bold hover:opacity-70 text-slate-200 disabled:opacity-40 ease-out duration-200"
          onClick={addRow}
          disabled={columns.length === 0}
        >
          + Add row
        </button>
      </main>
    </>
  );
};

const EmptyState = () => (
  <div className="w-1/2 mx-auto mt-20 text-center">
    <p className="text-lg">No Content</p>
    <p>Start your sheet by adding a column</p>
  </div>
);

type LoaderProps = {
  error?: string;
};

const Loader = (props: LoaderProps) => (
  <main className="w-screen h-screen bg-teal-700 flex justify-center align-middle text-center">
    <div className="text-white mt-32">
      <div className="text-xl mb-8 select-none font-bold first-letter:mr-2">📄 simple sheets </div>
      <div className="text-center ">{props.error ? props.error : "Loading sheet..."}</div>
      {props.error && (
        <div className="my-8">
          <a className="select-none  font-semibold hover:opacity-70 ease-in duration-200 underline" href="/">
            Crate new sheet
          </a>
        </div>
      )}
    </div>
  </main>
);

export default SheetEditor;
