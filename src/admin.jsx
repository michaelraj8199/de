import { Outlet, useLocation, useNavigate, useRoutes } from "react-router-dom";
import Adminsidebar from "./Common/Sidebar";
import React, { useEffect, useState } from "react";

import Grade from "./Page/grade";
import Offermapping from "./Page/offermapping";
import Offerproduct from "./Page/offerproduct";
import Pricingmodel from "./Page/pricingmodel";
import Pricingmodelmapping from "./Page/pricingmodelmapping";
import Ruledatabases from "./Page/ruledatabases";
import Term from "./Page/term";
import Termmapping from "./Page/termmapping";
import Productvalue from "./Page/productvalue";
import Runinsanbox from "./Page/runinsanbox";
import Deconfig from "./Page/deconfig";
import footerlogo from "./asset/whitelogo.svg";
import axios from "axios";
import Sidebar from "./Common/Sidebar";



function Admin() {
  const queryParams = useLocation();

  const routes = useRoutes([
    { path: "/offermapping", element: <Offermapping /> },
    { path: "/grade", element: <Grade /> },
    { path: "/offerproduct", element: <Offerproduct /> },
    { path: "/pricingmodel", element: <Pricingmodel /> },
    { path: "/pricingmodelmapping", element: <Pricingmodelmapping /> },
    { path: "/term", element: <Term /> },
    { path: "/termmapping", element: <Termmapping /> },
    { path: "/ruledatabases", element: <Ruledatabases /> },
    { path: "/productvalue", element: <Productvalue /> },
    { path: "/runinsanbox", element: <Runinsanbox /> },
    { path: "/deconfig", element: <Deconfig /> },

    { path: "/", element: <Sidebar /> },
  ]);
  useEffect(() => {
    axios
      .post("https://de-qa.theecentral.com/api/auth/login", {
        email: "admin@de.com",
        password: "Admin@213$",
      })
      .then(
        (response) => {
          if (response.status === 200)
            sessionStorage.setItem("Token", response.data.jwtAccessToken);
        },
        (error) => {
          console.log(error);
        }
      );
    let token = sessionStorage.getItem("Token");
  }, []);
  return (
    <div>
      <div className="logosection">
        <div className="displayFlex">
          <img src={footerlogo} className=" " />
        </div>
      </div>
      <div className="header">
        {queryParams.pathname === "/princingdatabase"
          ? "Princing Model Mapping"
          : queryParams.pathname === "/offeredproduct"
          ? "Offered Product"
          : queryParams.pathname === "/productvalue"
          ? "Product Value"
          : queryParams.pathname === "/runinsanbox"
          ? "Run in Sandbox"
          : queryParams.pathname === "/term"
          ? "Term Model"
          : queryParams.pathname === "/termmapping"
          ? "Terms Mapping"
          : queryParams.pathname === "/deconfig"
          ? "De Config"
          : queryParams.pathname === "/ruledatabases"
          ? "Rule databases"
          : queryParams.pathname === "/offermapping"
          ? "Offers Mapping"
          : queryParams.pathname === "/grade"
          ? ""
          : queryParams.pathname === "/pricingmodel"
          ? " "
          : null}
      </div>

      <div>
        <div>
          <main>{routes}</main>
        </div>
      </div>
    </div>
  );
}

export default Admin;
