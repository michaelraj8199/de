import Sidebar from "../Common/Sidebar";

import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useStateValue } from ".././Common/stateprovider";
import axios from "axios";
import Mapprovider from "../Common/mapprovider";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Pricingmodelmapping() {
  const [initialState] = useStateValue();
  const [show, setShow] = useState(false);

  const token = sessionStorage.getItem("Token");
  // const [grade, setGrade] = useState([]);
  const [gradebin, setGradebin] = useState([]);
  const [incomebin, setincomebin] = useState([]);
  const [selectedValueObj, setSelectedValueObj] = useState([]);
  const [selectedObj, setSelectedObj] = useState([]);
  console.log("selectedValueObj::: ", selectedValueObj);
  console.log("selectedObj::: ", selectedObj);

  const [scorebin, setscorebin] = useState([]);
  const [scorevalue, setscoreValue] = useState([]);
  console.log("::::::::::::::::::::::::::::", scorevalue);

  // const [data, setdata] = useState([]);
  const handleClose = () => {
    setShow(false);
  };
  const handleOpen = () => {
    setShow(true);
  };

  useEffect(() => {
    if (initialState?.settingid !== "") {
      getProductvalueList();
      Productvalueadd.resetForm();
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
    },
    validationSchema: Yup.object({
      score: Yup.string().required("*Score is required"),
      income: Yup.string().required("*Income is required"),
      apr: Yup.number()
        .typeError("Input must be a number")
        .required("Input is required")
        .positive("Input must be a positive number"),
      grades: Yup.string().required("*Pass Through is required"),
    }),
    onSubmit: async (values) => {
      let sendData = {
        score_id: Number(selectedValueObj.score),
        income_id: Number(selectedValueObj.income),
        settingId: Number(initialState.settingid),
        grade_id: Number(values.grades),
        apr: Number(values.apr),
      };

      axios
        .post("https://de-qa.theecentral.com/api/pricing-mapping/add", sendData, config)
        .then(
          (response) => {
            if (response?.status === 200 || response?.status === 201) {
              Productvalueadd.resetForm();
              toast.success("pricing mappinng Added Successfully");

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

  console.log("::: ", Productvalueadd.values);
  const getProductvalueList = async () => {
    axios
      .get(
        `https://de-qa.theecentral.com/api/pricing-mapping/get-all/${initialState?.settingid}`,
        config
      )
      .then(function (response) {
        if (response?.status === 200) {
          setincomebin(response.data.incomeBin);
          setGradebin(response.data.gradeBin);
          setscorebin(response.data.scoreBin);
          setscoreValue(response.data.scoreValue);

          console.log("sfytrsyrsyrstsr", response.data);
        }
      })
      .catch((err) => {
        console.log(err);

        toast.error(err);
      });
  };

  

  const fromikModal = useFormik({
    initialValues: {
      apr: "",
      grades: "",
    },
    validationSchema: Yup.object({
      apr: Yup.number()
        .typeError("Input must be a number")
        .required("Input is required")
        .positive("Input must be a positive number"),
      grades: Yup.string().required("*Pass Through is required"),
    }),
    onSubmit: async (values) => {
      console.log("values::: ", values);
      let formData = {
        score_id: Number(values.score_id),
        income_id: Number(values.income_id),
        settingId: initialState.settingid,
        grade_id: Number(values.grades),
        apr: Number(values.apr),
      };
      console.log("formData::: ", formData);
      axios
        .post(`https://de-qa.theecentral.com/api/pricing-mapping/add`, formData)
        .then((response) => {
          // console.log("res::: ", res);
          if (response.status === 200 || response?.status === 201) {
            toast.success("Grade APR updated successfully");
            fromikModal.resetForm();
          
            getProductvalueList();
          }
          if (response.status === 400) {
            toast.error("Bad Request");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
      values.apr = "";
      values.grades = "";
      handleClose();
      getProductvalueList();
    },
  });

  //start---modal open and prepopulate
  const handleModal = (val) => {
    console.log("val::: ", val);
    handleOpen();
    fromikModal.setFieldValue("apr", val.apr);
    fromikModal.setFieldValue("grades", val.value_id);
    fromikModal.setFieldValue("score_id", val.score_id);
    fromikModal.setFieldValue("income_id", val.income_id);
    fromikModal.setFieldValue("id", val.id);
  };
  // //end---modal open and prepopulate

  // //start---update at page
  const handleUpdateChange = (event) => {
    Productvalueadd.setFieldValue("score", event.target.values);
    Productvalueadd.setFieldValue("income", event.target.values);

    const selectedScore = event.target.value;
    const name = event.target.name;
    console.log("name::: ", name);
    if (name === "score") {
      const matchingEntry = scorevalue.find(
        (entry) => entry.score === selectedScore
        
      );

      setSelectedObj([matchingEntry]);
      if (matchingEntry) {
        Productvalueadd.setFieldValue("score", matchingEntry.score);
        
      }
    }
    if (name === "income" && selectedObj.length > 0) {
      Productvalueadd.setFieldValue("income", selectedScore);
      const matchingEntry = scorevalue.find(
        (entry) => entry.score === Productvalueadd.values.score
      );

      console.log("matchingEntryInside::: ", matchingEntry);
      const incomeValueFound = matchingEntry.valueArr.some((value) => {
        if (value.income === selectedScore) {
          console.log("value::: ", value);
          Productvalueadd.setFieldValue(
            "apr",
            value.apr === null ? "" : value.apr
          );
          Productvalueadd.setFieldValue(
            "grades",
            value.value === null ? "" : value.value_id
          );
          setSelectedValueObj(value);
        }
      });
    }
  };
  // //end---update at page


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
                    <label for="ContactName">Score</label>
                    <select
                      className="form-select"
                      name="score"
                      onChange={handleUpdateChange}
                      onBlur={Productvalueadd.handleBlur}
                      value={Productvalueadd.values.score}
                    >
                      <option defaultValue value="default">
                        Select Score
                      </option>
                      {scorebin?.map((offers) => (
                        <option key={offers?.id} value={offers?.score}>
                          {offers?.score}
                        </option>
                      ))}
                    </select>
                    {/* console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyy",offers.score) */}
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
                      onChange={handleUpdateChange}
                      onBlur={Productvalueadd.handleBlur}
                      value={Productvalueadd.values.income}
                    >
                      <option defaultValue value="default">
                        Select Income
                      </option>
                      {incomebin?.map((offers) => (
                        <option key={offers?.id} value={offers?.income}>
                          {offers?.income}
                        </option>
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

                <div className="col-md-3">
                  <div className="form-group">
                    {Productvalueadd.values.grades !== "" &&
                    Productvalueadd.values.apr !== "" ? (
                      <button type="submit" className="btn btn-success mt18">
                        UPDATE
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-success mt18">
                        ADD
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="row">
            <div className="col-md-6">
              <div className=" ">
                <div className="productHeader font_Weight_bold textAlignCenter">
                  Income
                </div>
                <div className="tableResponsive">
                  <table className="table mainTable">
                    <thead>
                      <tr className="textAlignCenter">
                        {scorevalue.length > 0 && (
                          <th className="whitespacenowrap textAlignLeft">
                            Score Bin
                          </th>
                        )}
                        {incomebin.length > 0
                          ? incomebin?.map((el) => (
                              <>
                                <th>{el?.income}</th>
                              </>
                            ))
                          : "No Income and Score Data Available"}
                      </tr>
                    </thead>
                    <tbody>
                      {scorevalue.length > 0 &&
                        scorevalue?.map((i) => {
                          return (
                            <tr>
                              <td className="font_Weight_bold">{i?.score}</td>
                              {i?.valueArr?.map((j) => {
                                return (
                                  <>
                                    <td
                                      className="textAlignCenter"
                                      onClick={() => {
                                        j.value !== null && handleModal(j);
                                      }}
                                    >
                                      {j.value === null ? "-" : j.value}
                                    </td>
                                  </>
                                );
                              })}
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              {" "}
              <div className=" ">
                <div className="productHeader font_Weight_bold textAlignCenter">
                  APR
                </div>
                <div className="tableResponsive">
                  <table className="table mainTable">
                    <thead>
                      <tr className="textAlignCenter">
                        {scorevalue.length > 0 && (
                          <th className="whitespacenowrap textAlignLeft">
                            Score Bin
                          </th>
                        )}
                        {incomebin.length > 0
                          ? incomebin?.map((el) => (
                              <>
                                <th>{el?.income}</th>
                              </>
                            ))
                          : "No Income and Score Data available"}
                      </tr>
                    </thead>
                    <tbody>
                      {scorevalue?.map((i) => {
                        return (
                          <tr>
                            <td className="font_Weight_bold">{i?.score}</td>
                            {i?.valueArr?.map((j) => {
                              return (
                                <>
                                  <td
                                    className="textAlignCenter"
                                    onClick={() => {
                                      j.value !== null && handleModal(j);
                                    }}
                                  >
                                    {j.apr === null ? "-" : j.apr}
                                  </td>
                                </>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <Modal
                  show={show}
                  onHide={() => {
                    handleClose();
                    fromikModal.resetForm();
                  }}
                >
                  <Modal.Body>
                    <form onSubmit={fromikModal.handleSubmit}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label for="ContactName">Grades</label>
                            <select
                              className="form-select"
                              name="grades"
                              id="grades"
                              value={fromikModal.values.grades}
                              onChange={fromikModal.handleChange}
                              onBlur={fromikModal.handleBlur}
                            >
                              <option value="">Select Grades</option>
                              {gradebin.map((el) => (
                                <option key={el.id} value={el.id}>
                                  {el.value}
                                </option>
                              ))}
                            </select>
                          </div>

                          {fromikModal.touched.grades &&
                            fromikModal.errors.grades && (
                              <span className="error_text">
                                {fromikModal.errors.grades}
                              </span>
                            )}
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label for="ContactName">APR(%)</label>
                            <input
                              type="text"
                              name="apr"
                              className="form-control"
                              placeholder="Enter APR"
                              id="apr"
                              value={fromikModal.values.apr}
                              onChange={fromikModal.handleChange}
                              onBlur={fromikModal.handleBlur}
                            />
                            {fromikModal.touched.apr &&
                              fromikModal.errors.apr && (
                                <span className="error_text">
                                  {fromikModal.errors.apr}
                                </span>
                              )}
                          </div>
                        </div>
                      </div>

                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            handleClose();
                            fromikModal.resetForm();
                          }}
                        >
                          Cancel
                        </Button>
                        {/* <Button variant="secondary" onClick={handleDelete}>
                          Delete
                        </Button> */}
                        <Button type="submit">Update</Button>
                      </Modal.Footer>
                    </form>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricingmodelmapping;
