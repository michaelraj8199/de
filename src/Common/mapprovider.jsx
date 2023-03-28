// import React from 'react'
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthGet, AuthPost, geturl, Post } from "../common_var/httpService";
import { useStateValue } from "./../Common/stateprovider";

import { useNavigate } from "react-router-dom";
import axios from "axios";

function Mapprovider() {
  const [initialState] = useStateValue();
  const token = sessionStorage.getItem("Token");
  const [setting, setsetting] = useState([]);
  const [{}, dispatch] = useStateValue();

  const [doctype, setdoctype] = useState([]);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const getseetingList = async () => {
    axios
      .get("https://de-qa.theecentral.com/api/rules-config/get-all-settings", config)
      .then(function (response) {
        if (response?.status === 200) {
          setsetting(response?.data);
          dispatch({
            type: "Set_setting_id",
            payload: response?.data.data[0]?.id,
          });

          ;
        }
      })
      .catch((err) => {
        console.log(err);

        toast.error(err);
      });
  };

  const handleSetSetting = (e) => {
    setdoctype(e.target.value);
    dispatch({
      type: "Set_setting_id",
      payload: e.target.value,
    });
  };

  useEffect(() => {
    if (token === null) {
      axios
        .post("https://de-qa.theecentral.com/api/auth/login", {
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
          },
          (error) => {
            console.log(error);
          }
        );

      let token = sessionStorage.getItem("Token");
    } else {
      getseetingList(token);
    }
  }, []);
  return (
    <div className="whiteBg mb20">
      <div className="container-fluid">
        <div className="row AlignItemCenter">
          <div className="col-md-2 ">
            <label for="ContactName" className="nowrap">
              Map Provider &nbsp;{" "}
            </label>
          </div>
          <div className="col-md-3 ">
            <select
              value={doctype}
              className="form-control"
              name="settingRule"
              onChange={(newValue) => handleSetSetting(newValue)}
            >
              {setting.data?.map((setting) => (
                <option key={setting.id} value={setting.id}>
                  {setting.provider_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mapprovider;
