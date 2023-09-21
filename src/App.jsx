import React, { useState } from 'react'
import './App.css'
import {Navigate, Outlet} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import {useStore} from "effector-react";
import {$authStatus} from "./models/auth_model.js";

function App() {
    const authStatus = useStore($authStatus)

  console.log(React.version);

    if (!authStatus) {
        return <Navigate to="/login" />;
    }
      return (
        <>
          <Outlet />
        </>
      )
}

export default App
