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
import footerlogo from "./asset/whitelogo.svg";
import MapProvider from "./Common/mapprovider";
import { Post } from "./common_var/httpService";
import Sidebar from "./Common/Sidebar";
import axios from "axios";

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
    { path: "/", element: <Sidebar /> },
  ]);
  useEffect(() => {
    axios
      .post("https://de-dev-api.theecentral.com/api/auth/login", {
        email: "admin@de.com",
        password: "Admin@213$",
      })
      .then(
        (response) => {
          console.log(
            "tdttdtdtttttttttttttttttt",
            response.data.jwtAccessToken
          );
          if (response.status === 200)
            sessionStorage.setItem("Token", response.data.jwtAccessToken);
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    let token = sessionStorage.getItem("Token");
    console.log("Token::: ", token);
  }, []);
  return (
    <div>
      <div className="logosection">
        <div className="displayFlex">
          {/* <img src={menuicon} className="mobileMenuicon" /> */}
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
          ? ""
          : null}
      </div>

      <div>
        <div>{/* <Adminsidebar /> */}</div>
        {/* {queryParams.pathname !== "/admin/login" && (
         
        )} */}
        <div>
          {/* <MapProvider /> */}
          <main>{routes}</main>
        </div>
      </div>
    </div>
  );
}

export default Admin;
