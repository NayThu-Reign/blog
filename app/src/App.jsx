import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Layout";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddArticle from "./pages/AddArticle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home /> 
      },
      {
        path: "/articles/:id",
        element: <Article /> 
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/new",
        element: <AddArticle />
      },
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />
}