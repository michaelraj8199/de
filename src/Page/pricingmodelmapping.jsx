import Sidebar from "../Common/Sidebar";

import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useStateValue } from ".././Common/stateprovider";
import axios from "axios";
import Mapprovider from "../Common/mapprovider";

function Pricingmodelmapping() {
  const [initialState] = useStateValue();
  const token = sessionStorage.getItem("Token");
  const [grade, setGrade] = useState([]);
  const [gradebin, setGradebin] = useState([]);
  const [incomebin, setincomebin] = useState([]);
  const [scorebin, setscorebin] = useState([]);
  const [scorevalue, setscorevalue] = useState([]);

  const [data, setdata] = useState([]);

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
      score: "",
      income: "",
      apr: "",
      grades: "",
      // settingId: initialState?.settingid?.setting_id,
    },
    validationSchema: Yup.object({
      score: Yup.string().required("*Score is required"),
      income: Yup.string().required("*Declined value Fee is required"),
      apr: Yup.number()
        .typeError("Input must be a number")
        .required("Input is required")
        .positive("Input must be a positive number"),
      grades: Yup.string().required("*Pass Through is required"),
    }),
    onSubmit: async (values) => {
      let sendData = {
        score_id: Number(values.score),
        income_id: Number(values.income),
        settingId: Number(initialState.settingid),
        grade_id: Number(values.grades),
        apr: Number(values.apr),
      };

      axios
        .post(
          "https://de-dev-api.theecentral.com/api/pricing-mapping/add",
          sendData,
          config
        )
        .then(
          (response) => {
            if (response?.status === 200 || response?.status === 201) {
              Productvalueadd.resetForm();
              alert("pricning mappinng Added Successfully");
              getProductvalueList();
            } else {
              alert("eerrror");
            }
          },
          (error) => {
            console.log(error);
          }
        );
      values.apr = "";
      values.grades = "";
    },
  });

  const getProductvalueList = async () => {
    axios
      .get(
        `https://de-dev-api.theecentral.com/api/pricing-mapping/get-all/${initialState?.settingid}`,
        config
      )
      .then(function (response) {
        if (response?.status === 200) {
          setincomebin(response.data.incomeBin);
          setGradebin(response.data.gradeBin);
          setscorebin(response.data.scoreBin);
          setscorevalue(response.data.scoreValue);
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
        `https://de-dev-api.theecentral.com/api/offers-mapping/inactive/${id}`,
        sendData,
        config
      )
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          alert("Offer mapping delete ");
          toast.success("Offer mapping delete");
          getProductvalueList();
        } else {
          toast.error("please select value");
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
            <div className="navbar-header">Pricing Mapping </div>
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
                      name="grades"
                      onChange={Productvalueadd.handleChange}
                      onBlur={Productvalueadd.handleBlur}
                      value={Productvalueadd.values.grades}
                    >
                      <option defaultValue value="default">
                        Select Grade
                      </option>
                      {gradebin?.map((offers) => (
                        <option value={offers?.id}>{offers?.value}</option>
                      ))}
                    </select>
                    {Productvalueadd.touched.grades &&
                    Productvalueadd.errors.grades ? (
                      <span className="error_text text-danger">
                        {Productvalueadd.errors.grades}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group">
                    <label for="ContactName">Score</label>
                    <select
                      className="form-select"
                      name="score"
                      onChange={Productvalueadd.handleChange}
                      onBlur={Productvalueadd.handleBlur}
                      value={Productvalueadd.values.score}
                    >
                      <option defaultValue value="default">
                        Select Score
                      </option>
                      {scorebin?.map((offers) => (
                        <option value={offers?.id}>{offers?.score}</option>
                      ))}
                    </select>
                    {Productvalueadd.touched.score &&
                    Productvalueadd.errors.score ? (
                      <span className="error_text text-danger">
                        {Productvalueadd.errors.score}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group">
                    <label for="ContactName">Income</label>
                    <select
                      className="form-select"
                      name="income"
                      onChange={Productvalueadd.handleChange}
                      onBlur={Productvalueadd.handleBlur}
                      value={Productvalueadd.values.income}
                    >
                      <option defaultValue value="default">
                        Select Term
                      </option>
                      {incomebin?.map((offers) => (
                        <option value={offers?.id}>{offers?.income}</option>
                      ))}
                    </select>
                    {Productvalueadd.touched.income &&
                    Productvalueadd.errors.income ? (
                      <span className="error_text text-danger">
                        {Productvalueadd.errors.income}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="col-md-2 ">
                  <label for="ContactName">APR </label>

                  <input
                    name="apr"
                    className="form-control"
                    placeholder="Enter APR"
                    id="apr"
                    onChange={(e) => {
                      Productvalueadd.setFieldValue(
                        "apr",
                        e.target.value.replace(/[^0-9]/g, "")
                      );
                    }}
                    onBlur={Productvalueadd.handleBlur}
                    value={Productvalueadd.values.apr}
                  />
                  {Productvalueadd.touched.apr && Productvalueadd.errors.apr ? (
                    <span className="error_text text-danger">
                      {Productvalueadd.errors.apr}
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
                  
                </table>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricingmodelmapping;
