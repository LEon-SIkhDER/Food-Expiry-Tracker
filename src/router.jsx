import { createBrowserRouter } from "react-router";
import Root from "./Layout/Root";
import Home from "./Components/Home";
import Fridge from "./Components/Fridge";
import LogIn from "./Components/Authentication/LogIn";
import Register from "./Components/Authentication/Register";
import AddFood from "./Components/AddFood";
import Details from "./Components/Details";

export const router = createBrowserRouter([
    {
        path: "/",
        element:<Root></Root>,
        children:[
            {index:true, Component:Home},
            {path:"/fridge", Component:Fridge},
            {path:"/login", Component:LogIn},
            {path:"/register", Component:Register},
            {path:"/add-food", Component:AddFood},
            {path:"/details", Component:Details},
        ]
    },
]);