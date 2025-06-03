import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from '../pages/Home/index';
import Device from '../pages/Device/index';
import Purchase from '../pages/Purchase/index';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "device",
        element: <Device />,
      },
      {
        path: "purchase",
        element: <Purchase />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],  
  },
]
);
