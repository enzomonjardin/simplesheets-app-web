import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { client } from "../graphql";
import HomePage from "../pages/home";
import SheetPage from "../pages/sheet";
import NotFound from "../pages/notFound";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/:sheetId" element={<SheetPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
