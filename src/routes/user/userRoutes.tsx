import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect} from "react-router-dom";
import create from "../../view/components/User/create";
import DashBoard from "../../view/pages/DashBoard";
import { State } from "../../view/state/store";


const userRoutes = [

    <Route path="/users/create" component= {create} />,
    // <Route path="/users/show" component= {create} />,
    // <Route path="/users/delete" component= {create}/ />


];

    


export default userRoutes;