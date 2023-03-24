// import React from "react";
import Sidebar from "../Common/Sidebar";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
// import { AuthGet, AuthPost, AuthPut, Put } from "../../common_var/httpService";
import { useStateValue } from ".././Common/stateprovider";
import axios from "axios";
import Mapprovider from "../Common/mapprovider";

function pricingmodel() {
  const [initialState] = useStateValue();
  const token = sessionStorage.getItem("Token");
  const [score_n_offerData, setScore_n_offerData] = useState();
  const [scoreEdit, setScoreEdit] = useState(null);
  const [scoreEditValue, setScoreEditValue] = useState("");
  const [income, setincome] = useState();

  const [incomeedit, setincomeid] = useState(null);
  const [incomeEditValue, setincomeEditValue] = useState("");

  useEffect(() => {
    if (initialState?.settingid !== "") {
      getScoreList();
      getincome();
    }
  }, [initialState]);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const addScore = useFormik({
    initialValues: {
      fromScore: "",
      toScore: "",
      settingId: initialState?.settingid?.setting_id,
    },
    onSubmit: async (values) => {
      if (values.offerId === "default") {
        alert("Offer Value Is Required");
        return;
      }

      values.fromScore = parseInt(values.fromScore);
      values.toScore = parseInt(values.toScore);
      values.settingId = Number(initialState?.settingid);

      axios
        .post(
          "https://de-dev-api.theecentral.com/api/pricing-model/add-score",
          values,
          config
        )
        .then(
          (response) => {
            if (response?.status === 200 || response?.status === 201) {
              addScore.resetForm();
              alert(" Score Added Successfully");
              getScoreList();
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

  const addIncome = useFormik({
    initialValues: {
      maxIncome: "",
      minIncome: "",
      settingId: initialState?.settingid?.setting_id,
    },
    onSubmit: async (values) => {
      if (values.offerId === "default") {
        alert("Offer Value Is Required");
        return;
      }

      values.maxIncome = parseInt(values.maxIncome);
      values.minIncome = parseInt(values.minIncome);
      values.settingId = Number(initialState?.settingid);

      axios
        .post(
          "https://de-dev-api.theecentral.com/api/pricing-model/add-income",
          values,
          config
        )
        .then(
          (response) => {
            if (response?.status === 200 || response?.status === 201) {
              addScore.resetForm();
              alert(" Income Added Successfully");
              getScoreList();
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

  const editScore = useFormik({
    initialValues: {
      fromScore: scoreEditValue?.fromScore ? scoreEditValue?.fromScore : "",
      toScore: scoreEditValue?.toScore ? scoreEditValue?.toScore : "",
      offerId: scoreEditValue?.offerId ? scoreEditValue?.offerId : "",
      // fromScore: scoreEditValue.fromScore,
    },
    // validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (values.offerId === "default") {
        toast.error("Offer Value Is Required", { duration: 4000 });
        return;
      }
      values.fromScore = parseInt(values.fromScore);
      values.toScore = parseInt(values.toScore);
      values.offerId = scoreEdit;

      axios
        .put(
          `https://de-dev-api.theecentral.com/api/pricing-model/update-score/${scoreEdit}`,
          values,
          config
        )
        .then(
          (response) => {
            console.log("hgfddsgfdsgfdsg", response);
            if (response?.status === 200) {
              // scoreEdit.setValues(response?.scoreEditValue);

              setScoreEdit(null);
              alert(" opiuuk Updated Successfully");
              resetForm();
              getScoreList();
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

  const editincome = useFormik({
    initialValues: {
      fromScore: incomeEditValue?.fromScore ? incomeEditValue?.fromScore : "",
      toScore: incomeEditValue?.toScore ? incomeEditValue?.toScore : "",
      offerId: incomeEditValue?.offerId ? incomeEditValue?.offerId : "",
      // fromScore: incomeEditValue.fromScore,
    },
    // validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (values.offerId === "default") {
        toast.error("Offer Value Is Required", { duration: 4000 });
        return;
      }
      values.fromScore = parseInt(values.fromScore);
      values.toScore = parseInt(values.toScore);
      values.offerId = incomeedit;

      axios
        .put(
          `https://de-dev-api.theecentral.com/api/pricing-model/update-income/${incomeedit}`,
          values,
          config
        )
        .then(
          (response) => {
            console.log("hgfddsgfdsgfdsg", response);
            if (response?.status === 200) {
              // scoreEdit.setValues(response?.incomeEditValue);

              setincomeid(null);
              alert(" opiuuk Updated Successfully");
              resetForm();
              getScoreList();
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

  const getScoreList = async () => {
    axios
      .get(
        `https://de-dev-api.theecentral.com/api/pricing-model/get-all-scores/${initialState?.settingid}`,
        config
      )
      .then(function (response) {
        if (response?.status === 200) {
          setScore_n_offerData(response?.data.allScores);
        }
      })
      .catch((err) => {
        console.log(err);

        toast.error(err);
      });
  };

  const getincome = async () => {
    axios
      .get(
        `https://de-dev-api.theecentral.com/api/pricing-model/get-all-income/${initialState?.settingid}`,
        config
      )
      .then(function (response) {
        if (response?.status === 200) {
          setincome(response?.data);

          console.log("666666666666666666666666666666666", response.data);
        }
      })
      .catch((err) => {
        console.log(err);

        toast.error(err);
      });
  };

  return (
    <div id="content">
      <Sidebar />
      <div className="ContentWrapper">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">Pricing Model</div>
          </div>
          <div className="container-fluid">
            <Mapprovider />
          </div>
        </nav>

        <div className="mainContent">
          <form onSubmit={addScore.handleSubmit}>
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-md-2 ">
                  {" "}
                  <label for="ContactName">Pricing Model &nbsp;</label>
                </div>
                <div className="col-md-2 ">
                  <div className="form-group">
                    <label for="fromScore">From Score</label>
                    <input
                      name="fromScore"
                      className="form-control"
                      placeholder="Enter From Score"
                      id="fromScore"
                      onChange={(e) => {
                        addScore.setFieldValue(
                          "fromScore",
                          e.target.value.replace(/[^0-9]/g, "")
                        );
                      }}
                      onBlur={addScore.handleBlur}
                      value={addScore.values.fromScore}
                    />
                    {addScore.touched.fromScore && addScore.errors.fromScore ? (
                      <span className="error_text text-danger">
                        {addScore.errors.fromScore}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-2 ">
                  <div className="form-group">
                    <label for="toScore"> To Score</label>
                    <input
                      name="toScore"
                      className="form-control"
                      placeholder="Enter To Score"
                      id="toScore"
                      onChange={(e) => {
                        addScore.setFieldValue(
                          "toScore",
                          e.target.value.replace(/[^0-9]/g, "")
                        );
                      }}
                      onBlur={addScore.handleBlur}
                      value={addScore.values.toScore}
                    />
                    {addScore.touched.toScore && addScore.errors.toScore ? (
                      <span className="error_text text-danger">
                        {addScore.errors.toScore}
                      </span>
                    ) : null}
                  </div>
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
                      <th style={{ width: "70%" }}>From Score</th>
                      <th style={{ width: "70%" }}>To Score</th>

                      <th style={{ width: "20%" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {score_n_offerData && score_n_offerData?.length > 0 ? (
                      score_n_offerData?.map((data, index) => (
                        <tr key={data.id}>
                          <td scope="row">{index + 1}</td>

                          <td>
                            {scoreEdit === data.id ? (
                              <>
                                <input
                                  name="fromScore"
                                  className="form-control"
                                  placeholder="Enter From Score"
                                  id="fromScore"
                                  // onChange={(e) => {
                                  //   setScoreEditValue({
                                  //     ...incomeEditValue,
                                  //     fromScore: e.target.value.replace(
                                  //       /[^0-9]/g,
                                  //       ""
                                  //     ),
                                  //   });
                                  // }}
                                  onChange={editScore.handleChange}
                                  onBlur={editScore.handleBlur}
                                  value={editScore.values.fromScore}
                                />

                                {editScore.touched.fromScore &&
                                editScore.errors.fromScore ? (
                                  <p className="error_text text-danger">
                                    {editScore.errors.fromScore}
                                  </p>
                                ) : null}
                              </>
                            ) : (
                              <span>{data.fromscore}</span>
                            )}
                          </td>

                          <td>
                            {scoreEdit === data.id ? (
                              <>
                                <input
                                  name="minIncome"
                                  className="form-control"
                                  placeholder="Enter To minIncome"
                                  id="editScoretToScore"
                                  // onChange={(e) => {
                                  //   setScoreEditValue({
                                  //     ...incomeEditValue,
                                  //     toScore: e.target.value.replace(
                                  //       /[^0-9]/g,
                                  //       ""
                                  //     ),
                                  //   });
                                  // }}
                                  onChange={editScore.handleChange}
                                  onBlur={editScore.handleBlur}
                                  value={editScore.values.minIncome}
                                />

                                {editScore.touched.minIncome &&
                                editScore.errors.minIncome ? (
                                  <p className="error_text text-danger">
                                    {editScore.errors.minIncome}
                                  </p>
                                ) : null}
                              </>
                            ) : (
                              <span>{data.toscore}</span>
                            )}
                          </td>

                          <td>
                            {scoreEdit === data.id ? (
                              <div>
                                <button
                                  className="btn btn-primary"
                                  type="button"
                                  style={{
                                    marginRight: "10px",
                                  }}
                                  onClick={() => {
                                    editScore.handleSubmit();
                                  }}
                                >
                                  Save
                                </button>
                                <button
                                  className="btn btn-primary"
                                  type="button"
                                  onClick={() => {
                                    setScoreEdit(null);
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div>
                                <button
                                  className="btn btn-outline-primary"
                                  type="button"
                                  style={{
                                    marginRight: "10px",
                                  }}
                                  onClick={() => {
                                    setScoreEdit(data.id);
                                    console.log(
                                      "tesr777777777777777777777",
                                      setScoreEditValue
                                    );
                                    setScoreEditValue({
                                      fromScore: data.fromscore,
                                      toScore: data.toscore,
                                      offerId: score_n_offerData.filter(
                                        (offers) =>
                                          offers.offer_label ===
                                          data.offer_label
                                      )[0].id,
                                      id: data.id,
                                    });
                                  }}
                                >
                                  <i className="fa fa-pencil-square-o"></i>
                                </button>

                                <button
                                  className="btn btn-outline-danger"
                                  // onClick={() => deleteScore(data.id)}
                                  type="button"
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <td colSpan="7" className="nodatarow">
                        No Scores Available for the Selected Provider
                      </td>
                    )}
                  </tbody>
                </table>
              </form>
            </div>
          </div>
          <form onSubmit={addIncome.handleSubmit}>
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-md-2 ">
                  {" "}
                  <label for="ContactName"> Income</label>
                </div>
                <div className="col-md-2 ">
                  <div className="form-group">
                    <label for="minIncome">MinIncome</label>
                    <input
                      name="minIncome"
                      className="form-control"
                      placeholder="Enter From minIncome"
                      id="minIncome"
                      onChange={(e) => {
                        addIncome.setFieldValue(
                          "minIncome",
                          e.target.value.replace(/[^0-9]/g, "")
                        );
                      }}
                      onBlur={addIncome.handleBlur}
                      value={addIncome.values.minIncome}
                    />
                    {addIncome.touched.minIncome &&
                    addIncome.errors.minIncome ? (
                      <span className="error_text text-danger">
                        {addIncome.errors.minIncome}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-2 ">
                  <div className="form-group">
                    <label for="maxIncome"> MaxIncome</label>
                    <input
                      name="maxIncome"
                      className="form-control"
                      placeholder="Enter maxIncome"
                      id="maxIncome"
                      onChange={(e) => {
                        addIncome.setFieldValue(
                          "maxIncome",
                          e.target.value.replace(/[^0-9]/g, "")
                        );
                      }}
                      onBlur={addIncome.handleBlur}
                      value={addIncome.values.maxIncome}
                    />
                    {addIncome.touched.maxIncome &&
                    addIncome.errors.maxIncome ? (
                      <span className="error_text text-danger">
                        {addIncome.errors.maxIncome}
                      </span>
                    ) : null}
                  </div>
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
                      <th style={{ width: "70%" }}>MinIncome</th>
                      <th style={{ width: "70%" }}>MaxIncome</th>

                      <th style={{ width: "20%" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {income && income?.data.length > 0 ? (
                      income?.data.map((data, index) => (
                        <tr key={data.id}>
                          <td scope="row">{index + 1}</td>

                          <td>
                            {incomeedit === data.id ? (
                              <>
                                <input
                                  name="minIncome"
                                  className="form-control"
                                  placeholder="Enter From Score"
                                  id="minIncome"
                                  onChange={editincome.handleChange}
                                  onBlur={editincome.handleBlur}
                                  value={editincome.values.minIncome}
                                />

                                {editincome.touched.minIncome &&
                                editincome.errors.minIncome ? (
                                  <p className="error_text text-danger">
                                    {editincome.errors.minIncome}
                                  </p>
                                ) : null}
                              </>
                            ) : (
                              <span>{data.min_income}</span>
                            )}
                          </td>

                          <td>
                            {incomeedit === data.id ? (
                              <>
                                <input
                                  name="maxIncome"
                                  className="form-control"
                                  placeholder="Enter To Score"
                                  id="editScoretToScore"
                                  // onChange={(e) => {
                                  //   setScoreEditValue({
                                  //     ...incomeEditValue,
                                  //     toScore: e.target.value.replace(
                                  //       /[^0-9]/g,
                                  //       ""
                                  //     ),
                                  //   });
                                  // }}
                                  onChange={editincome.handleChange}
                                  onBlur={editincome.handleBlur}
                                  value={editincome.values.maxIncome}
                                />

                                {editincome.touched.maxIncome &&
                                editincome.errors.maxIncome ? (
                                  <p className="error_text text-danger">
                                    {editincome.errors.maxIncome}
                                  </p>
                                ) : null}
                              </>
                            ) : (
                              <span>{data.max_income}</span>
                            )}
                          </td>

                          <td>
                            {incomeedit === data.id ? (
                              <div>
                                <button
                                  className="btn btn-primary"
                                  type="button"
                                  style={{
                                    marginRight: "10px",
                                  }}
                                  onClick={() => {
                                    h;
                                    editincome.handleSubmit();
                                  }}
                                >
                                  Save
                                </button>
                                <button
                                  className="btn btn-primary"
                                  type="button"
                                  onClick={() => {
                                    setincomeid(null);
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div>
                                <button
                                  className="btn btn-outline-primary"
                                  type="button"
                                  style={{
                                    marginRight: "10px",
                                  }}
                                  onClick={() => {
                                    setincomeid(data.id);
                                    console.log(
                                      "tesr777777777777777777777",
                                      setScoreEditValue
                                    );
                                    setincomeEditValue({
                                      fromScore: data.fromscore,
                                      toScore: data.toscore,
                                      offerId: score_n_offerData.filter(
                                        (offers) =>
                                          offers.offer_label ===
                                          data.offer_label
                                      )[0].id,
                                      id: data.id,
                                    });
                                  }}
                                >
                                  <i className="fa fa-pencil-square-o"></i>
                                </button>

                                <button
                                  className="btn btn-outline-danger"
                                  // onClick={() => deleteScore(data.id)}
                                  type="button"
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <td colSpan="7" className="nodatarow">
                        No Scores Available for the Selected Provider
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

export default pricingmodel;
