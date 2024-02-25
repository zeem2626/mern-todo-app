import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Components
import App from "./App.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Error from "./pages/Error.jsx";

// React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// React-Redux
import { Provider } from "react-redux";
import store from "./redux/store/store.js";

// Router
const router = createBrowserRouter([
   {
      path: "/",
      element: <App />,
      children: [
         {
            path: "",
            element: <Home />,
         },
         {
            path: "auth/register",
            element: <Register />,
         },
         {
            path: "auth/login",
            element: <Login />,
         },
         {
            path: "*",
            element: <Error />
         },
      ],
   },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <Provider store={store}>
         <RouterProvider router={router} />
      </Provider>
   </React.StrictMode>
);
