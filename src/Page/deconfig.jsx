// import React from 'react'
import Sidebar from "../Common/Sidebar";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
// import { AuthGet, AuthPost, AuthPut, Put } from "../../common_var/httpService";
import { useStateValue } from ".././Common/stateprovider";
import axios from "axios";
import Mapprovider from "../Common/mapprovider";

function deconfig() {
  const [initialState] = useStateValue();

  return (
    // <div>deconfig</div>
    <div id="content">
      <Sidebar />
      <div className="ContentWrapper">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">Mape Provider</div>
          </div>
          <div className="container-fluid">
            <Mapprovider />
          </div>
        </nav>

       
      </div>
    </div>
  )
}

export default deconfig