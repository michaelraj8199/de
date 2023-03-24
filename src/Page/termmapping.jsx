import Sidebar from "../Common/Sidebar";

import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useStateValue } from ".././Common/stateprovider";
import axios from "axios";
import Mapprovider from "../Common/mapprovider";
function termmapping() {
  const [initialState] = useStateValue();
  const token = sessionStorage.getItem("Token");

  const [terms, setTerms] = useState();

  useEffect(() => {
    if (initialState?.settingid !== "") {
      getProductvalueList();
    }
  }, [initialState]);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const Productvalueadd = useFormik({
    initialValues: {
      gradeId: "",
      termId: "",
      term_duration: "",
      settingId: initialState?.settingid?.setting_id,
    },
    onSubmit: async (values) => {
      if (values.gradeId === "default") {
        alert("select gradeid Is Required");
        // toast.error("Offer Value Is Required", { duration: 4000 });
        return;
      }
      if (values.termId === "default") {
        alert("select termId Is Required");

        return;
      }
      values.term_duration = parseInt(values.term_duration);
      values.gradeId = parseInt(values.gradeId);
      values.termId = parseInt(values.termId);

      values.settingId = Number(initialState?.settingid);

      axios
        .post(
          "https://de-dev-api.theecentral.com/api/term-mapping/add",
          values,
          config
        )
        .then(
          (response) => {
            if (response?.status === 200 || response?.status === 201) {
              Productvalueadd.resetForm();
              alert("Duration Added Successfully");
              getProductvalueList();
            } else {
              alert("eerrror");
            }
          },
          (error) => {
            console.log(error);
          }
        );
    },
  });

  const getProductvalueList = async () => {
    axios
      .get(
        `https://de-dev-api.theecentral.com/api/term-mapping/get-all/${initialState?.settingid}`,
        config
      )
      .then(function (response) {
        if (response?.status === 200) {
          setTerms(response.data);

          console.log("ghfshgsc", response.data);
        }
      })
      .catch((err) => {
        console.log(err);

        toast.error(err);
      });
  };

  const deleteoffer = async (id) => {
    let sendData = {
      active: false,
      // gradeId: data?.term_grade_id,
      settingId: +initialState?.settingid,
    };
    console.log("Data: ", data);

    axios
      .put(
        `https://de-dev-api.theecentral.com/api/term-mapping/inactive/${id}`,
        // config,
        sendData,
        config
      )
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          alert("Term mapping delete ");
          // toast.success(res.message, { duration: 4000 });
          getProductvalueList();
        } else {
          // toast.error(res.message);
        }
      })
      .catch((err) => toast.error(err));
  };

  return (
    <div id="content">
      <Sidebar />
      <div className="ContentWrapper">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">Term Mapping </div>
          </div>
          <div className="container-fluid">
            <Mapprovider />
          </div>
        </nav>

        <div className="mainContent">
          <form onSubmit={Productvalueadd.handleSubmit}>
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-md-2">
                  <div className="form-group">
                    <label for="ContactName">Grade </label>
                    <select
                      className="form-select"
                      name="gradeId"
                      onChange={Productvalueadd.handleChange}
                      onBlur={Productvalueadd.handleBlur}
                      value={Productvalueadd.values.gradeId}
                    >
                      <option defaultValue value="default">
                        Select Grade
                      </option>
                      {terms?.grade?.map((offers) => (
                        <option value={offers?.id}>
                          {offers?.grade_description}
                        </option>
                      ))}
                    </select>
                    {Productvalueadd.touched.gradeId &&
                    Productvalueadd.errors.gradeId ? (
                      <span className="error_text text-danger">
                        {Productvalueadd.errors.gradeId}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group">
                    <label for="ContactName">Term </label>
                    <select
                      className="form-select"
                      name="termId"
                      onChange={Productvalueadd.handleChange}
                      onBlur={Productvalueadd.handleBlur}
                      value={Productvalueadd.values.termId}
                    >
                      <option defaultValue value="default">
                        Select Term
                      </option>
                      {terms?.terms?.map((offers) => (
                        <option value={offers?.id}>
                          {offers?.term_description}
                        </option>
                      ))}
                    </select>
                    {Productvalueadd.touched.termId &&
                    Productvalueadd.errors.termId ? (
                      <span className="error_text text-danger">
                        {Productvalueadd.errors.termId}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-2 ">
                  <label for="ContactName">Duration </label>

                  <input
                    name="term_duration"
                    className="form-select"
                    placeholder="Enter Duration"
                    id="term_duration"
                    onChange={(e) => {
                      Productvalueadd.setFieldValue(
                        "term_duration",
                        e.target.value.replace(/[^0-9]/g, "")
                      );
                    }}
                    onBlur={Productvalueadd.handleBlur}
                    value={Productvalueadd.values.term_duration}
                  />
                  {Productvalueadd.touched.term_duration &&
                  Productvalueadd.errors.term_duration ? (
                    <span className="error_text text-danger">
                      {Productvalueadd.errors.term_duration}
                    </span>
                  ) : null}
                </div>

                <div className="col-md-3">
                  <div className="form-group">
                    <button type="submit" className="btn btn-success mt18">
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="row">
            <div className="col-12">
              <form name="form">
                <table className="table mainTable">
                  <thead>
                    <tr>
                      <th style={{ width: "10%" }}>S.No</th>
                      <th style={{ width: "70%" }}>Grade</th>
                      <th style={{ width: "70%" }}>Term</th>

                      <th style={{ width: "70%" }}>Duration</th>

                      <th style={{ width: "20%" }}>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {terms?.termMapping?.length > 0 ? (
                      terms?.termMapping?.map((data, index) => (
                        <tr key={data?.id}>
                          <td>{index + 1}</td>
                          <td>
                            <span>{data?.grade_description}</span>
                          </td>
                          <td>
                            <span>{data?.term_description}</span>
                          </td>
                          <td>
                            <span>{data?.term_duration}</span>
                          </td>

                          <td>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => deleteoffer(data?.term_grade_id)}
                              type="button"
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <td colSpan="5" className="nodatarow">
                        No Terms Available for the Selected Provider
                      </td>
                    )}
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default termmapping;
