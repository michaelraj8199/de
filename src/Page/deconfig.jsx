
import Sidebar from "../Common/Sidebar";
import React, { useEffect, useState } from "react";
import { useStateValue } from ".././Common/stateprovider";
import Mapprovider from "../Common/mapprovider";

function Deconfig() {
  const [initialState] = useStateValue();

  return (
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
  );
}

export default Deconfig;
