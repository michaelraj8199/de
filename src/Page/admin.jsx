import React from "react";
import { Outlet, useLocation, useNavigate, useRoutes } from "react-router-dom";
import Adminsidebar from "../Common/Sidebar";

import Grade from "../Page/grade";
import Offermapping from "../Page/offermapping";
import Offerproduct from "../Page/offerproduct";
import Pricingmodel from "../Page/pricingmodel";
import Pricingmodelmapping from "../Page/pricingmodelmapping";
import Ruledatabases from "../Page/ruledatabases";
import Term from "../Page/term";
import Termmapping from "../Page/termmapping";
import Productvalue from "../Page/productvalue";
import Runinsanbox from "../Page/runinsanbox";

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
  ]);
  return (
    <div>
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
          : null}
      </div>

      <div>
      <div>
            {/* <Adminsidebar /> */}
          </div>
        {/* {queryParams.pathname !== "/admin/login" && (
         
        )} */}
        <div>
          <main>{routes}</main>
        </div>
      </div>
    </div>
  );
}

export default Admin;
