import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCreateSheetMutation from "../../../graphql/hooks/useCreateSheetMutation";

const useCreateNewSheet = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigate = useNavigate();
  const [mutate, mutationResult] = useCreateSheetMutation();

  const createNewSheet = () => {
    setErrorMessage(undefined);
    mutate({ variables: { input: { name: `Sheet ${new Date().toISOString().split("T")[0]}` } } }).then((res) => {
      const newSheetId = res.data?.createSheet?.id;
      if (newSheetId) {
        navigate(`/${newSheetId}`);
      } else {
        setErrorMessage(`Failed to create new sheet`);
      }
    });
  };

  const error = mutationResult?.error?.message ?? errorMessage;
  return { createNewSheet, loading: mutationResult.loading, error };
};

export default useCreateNewSheet;
