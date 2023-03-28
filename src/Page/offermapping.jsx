import Sidebar from "../Common/Sidebar";

import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useStateValue } from ".././Common/stateprovider";
import axios from "axios";
import Mapprovider from "../Common/mapprovider";

function Offermapping() {
  const [initialState] = useStateValue();
  const token = sessionStorage.getItem("Token");
  const [grade, setGrade] = useState([]);
  const [data, setdata] = useState([]);

  const [offer, setOffer] = useState([]);
  const [offerValue, setOfferValue] = useState([]);
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
      grade: "",
      offerName: "",
      offerValue: "",
      minAPR: "",
      maxAPR: "",
    },
    onSubmit: async (values) => {
      let sendData = {
        gradeId: +values.grade,
        offerValId: +values.offerValue,
        minApr: +values.minAPR,
        maxApr: +values.maxAPR,
        settingId: +initialState?.settingid,
      };

      axios
        .post(
          "http://localhost:8000/api/offers-mapping/add",
          sendData,
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
        `http://localhost:8000/api/offers-mapping/get-all/${initialState?.settingid}`,
        config
      )
      .then(function (response) {
        if (response?.status === 200) {
          console.log("jcvjcvjcvcjcvjcvjcv", response.data.current_data);
          setdata(response.data.current_data);
          setGrade(response.data.grades);
          setOffer(response.data.offers);
          setOfferValue(response.data.offerValue);

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
      settingId: +initialState?.settingid,
    };
    console.log("Data: ", data);

    axios
      .put(
        `http://localhost:8000/api/offers-mapping/inactive/${id}`,
        sendData,
        config
      )
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          alert("Offer mapping delete ");
          toast.success("Offer mapping delete");
          getProductvalueList();
        } else {
          toast.error("Please  required");
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
            <div className="navbar-header">Offer Mapping </div>
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
                      name="grade"
                      onChange={Productvalueadd.handleChange}
                      onBlur={Productvalueadd.handleBlur}
                      value={Productvalueadd.values.grade}
                    >
                      <option defaultValue value="default">
                        Select Grade
                      </option>
                      {grade?.map((offers) => (
                        <option value={offers?.id}>
                          {offers?.grade_description}
                        </option>
                      ))}
                    </select>
                    {Productvalueadd.touched.grade &&
                    Productvalueadd.errors.grade ? (
                      <span className="error_text text-danger">
                        {Productvalueadd.errors.grade}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group">
                    <label for="ContactName">Offer Name </label>
                    <select
                      className="form-select"
                      name="offerName"
                      onChange={Productvalueadd.handleChange}
                      onBlur={Productvalueadd.handleBlur}
                      value={Productvalueadd.values.offerName}
                    >
                      <option defaultValue value="default">
                        Select Offer Name
                      </option>
                      {offer?.map((offers) => (
                        <option value={offers?.id}>
                          {offers?.offer_label}
                        </option>
                      ))}
                    </select>
                    {Productvalueadd.touched.offerName &&
                    Productvalueadd.errors.offerName ? (
                      <span className="error_text text-danger">
                        {Productvalueadd.errors.offerName}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group">
                    <label for="ContactName">Offer Value </label>
                    <select
                      className="form-select"
                      name="offerValue"
                      onChange={Productvalueadd.handleChange}
                      onBlur={Productvalueadd.handleBlur}
                      value={Productvalueadd.values.offerValue}
                    >
                      <option defaultValue value="default">
                        Select Term
                      </option>
                      {offerValue?.map((offers) => (
                        <option value={offers?.id}>
                          {offers?.offer_value}
                        </option>
                      ))}
                    </select>
                    {Productvalueadd.touched.offerValue &&
                    Productvalueadd.errors.offerValue ? (
                      <span className="error_text text-danger">
                        {Productvalueadd.errors.offerValue}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-2 ">
                  <label for="ContactName">Minimum APR </label>

                  <input
                    name="minAPR"
                    className="form-control"
                    placeholder="Enter Mininum APR"
                    id="minAPR"
                    onChange={(e) => {
                      Productvalueadd.setFieldValue(
                        "minAPR",
                        e.target.value.replace(/[^0-9]/g, "")
                      );
                    }}
                    onBlur={Productvalueadd.handleBlur}
                    value={Productvalueadd.values.minAPR}
                  />
                  {Productvalueadd.touched.minAPR &&
                  Productvalueadd.errors.minAPR ? (
                    <span className="error_text text-danger">
                      {Productvalueadd.errors.minAPR}
                    </span>
                  ) : null}
                </div>

                <div className="col-md-2 ">
                  <label for="ContactName">Maximum APR </label>

                  <input
                    name="maxAPR"
                    className="form-control"
                    placeholder="Enter Maximium APR"
                    id="maxAPR"
                    onChange={(e) => {
                      Productvalueadd.setFieldValue(
                        "maxAPR",
                        e.target.value.replace(/[^0-9]/g, "")
                      );
                    }}
                    onBlur={Productvalueadd.handleBlur}
                    value={Productvalueadd.values.maxAPR}
                  />
                  {Productvalueadd.touched.maxAPR &&
                  Productvalueadd.errors.maxAPR ? (
                    <span className="error_text text-danger">
                      {Productvalueadd.errors.maxAPR}
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
                      <th style={{ width: "70%" }}>Offer Name</th>

                      <th style={{ width: "70%" }}>Offer Value</th>
                      <th style={{ width: "70%" }}>Minimum APR</th>
                      <th style={{ width: "70%" }}>Maximum APR</th>

                      <th style={{ width: "20%" }}>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.length > 0 ? (
                      data.map((data, index) => (
                        <tr key={data?.id}>
                          <td>{index + 1}</td>
                          <td>
                            <span>{data?.grade}</span>
                          </td>
                          <td>
                            <span>{data?.offer_name}</span>
                          </td>
                          <td>
                            <span>{data?.offer_value}</span>
                          </td>
                          <td>
                            <span>{data?.min_apr}</span>
                          </td>
                          <td>
                            <span>{data?.max_apr}</span>
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

export default Offermapping;
