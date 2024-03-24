import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Auth } from "./pages/auth/index";
import { ExpenseTracker } from "./pages/expense-tracker/index";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/expense-tracker",
    element: <ExpenseTracker />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={Router} />
    </>
  );
};

export default App;
