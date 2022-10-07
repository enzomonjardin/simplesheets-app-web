import { useEffect } from "react";
import useCreateNewSheet from "../../core/sheets/hooks/useCreateNewSheet";

const HomePage = () => {
  const { createNewSheet, loading, error } = useCreateNewSheet();

  useEffect(() => {
    setTimeout(() => {
      createNewSheet();
    }, 2000);
  }, []);

  return (
    <main className="w-screen h-screen bg-teal-700 flex justify-center align-middle">
      <div className="text-white mt-32">
        <div className="text-xl mb-8 select-none font-bold first-letter:mr-2">📄 simple sheets </div>
        <div className="text-center"> {!error ? "Creating new sheet..." : `Error:${error}`}</div>
      </div>
    </main>
  );
};

export default HomePage;
