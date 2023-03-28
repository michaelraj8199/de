import Sidebar from "../Common/Sidebar";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useStateValue } from ".././Common/stateprovider";
import axios from "axios";
import Mapprovider from "../Common/mapprovider";
import Button from "react-bootstrap/Button";

function Term() {
  const [initialState] = useStateValue();
  const token = sessionStorage.getItem("Token");
  const [data, setdata] = useState([]);
  const [termeditedRowId, settermEditedRowId] = useState(null);
  const [termeditedValue, setgradeditedValue] = useState([]);

  useEffect(() => {
    if (initialState?.settingid !== "") {
      gettermList();
    }
  }, [initialState]);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const termadd = useFormik({
    initialValues: {
      term_description: "",
      settingId: initialState?.settingid?.setting_id,
    },
    validationSchema: Yup.object({
      term_description: Yup.string().required("*Term  is required"),
    }),
    onSubmit: async (values) => {
      let sendData = {
        term_description: values.term_description,
        settingId: Number(initialState?.settingid),
      };

      axios
        .post(
          "http://localhost:8000/api/term-model/add-term",
          sendData,
          config
        )
        .then(
          (response) => {
            if (response?.status === 200 || response?.status === 201) {
              termadd.resetForm();
              alert("Term Added Successfully");
              gettermList();
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

  const gradeedit = useFormik({
    initialValues: {
      description: termeditedValue.description,
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      let sendData = {
        description: termeditedValue,
      };

      axios
        .put(
          `http://localhost:8000/api/grade/update-grade/${termeditedRowId}`,
          sendData,
          config
        )
        .then(
          (response) => {
            if (response?.status === 200 || response?.status === 201) {
              gradeedit.setValues(response?.termeditedValue);
              settermEditedRowId(null);
              // gettermList();
              toast.success(response.message, { duration: 4000 });
              termadd.resetForm();
              // alert("Grade Updated Successfully");
              gettermList();
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

  const gettermList = async () => {
    axios
      .get(
        `http://localhost:8000/api/term-model/get-all/${initialState?.settingid}`,
        config
      )
      .then(function (response) {
        if (response?.status === 200) {
          setdata(response?.data);
        }
      })
      .catch((err) => {
        console.log(err);

        toast.error(err);
      });
  };

  const gradeDelete = async (id) => {
    let sendData = {
      active: false,
      settingId: +initialState?.settingid,
    };

    axios
      .put(
        `http://localhost:8000/api/term-model/update-inactive/${id}`,
        // config,
        sendData,
        config
      )
      .then(
        (response) => {
          if (response?.status === 200 || response?.status === 201) {
            gettermList();
            alert("Term Delete Successfully");
          } else {
            alert("eerrror");
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };
  return (
    <div id="content">
      <Sidebar />
      <div className="ContentWrapper">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">Term</div>
          </div>
          <div className="container-fluid">
            <Mapprovider />
          </div>
        </nav>

        <div className="mainContent">
          <form>
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-md-2 ">
                  {" "}
                  <label for="ContactName">Term &nbsp;</label>
                </div>
                <div className="col-md-2 ">
                  <input
                    name="term_description"
                    placeholder="Enter Term"
                    formControlName="term_description"
                    id="term_description"
                    onChange={termadd.handleChange}
                    onBlur={termadd.handleBlur}
                    value={termadd.values.term_description.replace(
                      /[^A-Za-z]/gi,
                      ""
                    )}
                    className="form-control"
                  />{" "}
                </div>
                <div className="col-md-2 ">
                  {" "}
                  <button
                    className="btn btn-outline-success displayFlex AlignItemCenter"
                    type="submit"
                    onClick={termadd.handleSubmit}
                    disabled={termadd.values.term_description === ""}
                  >
                    <i className="fas fa-plus"></i>

                    <div className="pl10"> ADD </div>
                  </button>{" "}
                </div>

                {termadd.touched.term_description &&
                termadd.errors.term_description ? (
                  <p className="error_text text-danger">
                    {termadd.errors.term_description}
                  </p>
                ) : null}
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
                      <th style={{ width: "70%" }}>Term</th>
                      <th style={{ width: "20%" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.data?.map((data, index) => (
                      <tr key={data.id}>
                        <td scope="row">{index + 1}</td>

                        <td>
                          {termeditedRowId === data.id ? (
                            <input
                              type="text"
                              name="term_description"
                              className="form-control"
                              placeholder="Grade"
                              value={termeditedValue}
                              onChange={(e) =>
                                setgradeditedValue(e.target.value)
                              }
                            />
                          ) : (
                            <span>{data.term_description}</span>
                          )}
                        </td>

                        <td>
                          {termeditedRowId === data.id ? (
                            <div>
                              <button
                                className="btn btn-primary"
                                type="button"
                                style={{
                                  marginRight: "10px",
                                }}
                                onClick={() => {
                                  gradeedit.handleSubmit();
                                }}
                              >
                                Save
                              </button>
                              <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => {
                                  settermEditedRowId(null);
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div>
                              <Button
                                variant="primary"
                                type="button"
                                style={{
                                  marginRight: "10px",
                                }}
                                onClick={() => {
                                  settermEditedRowId(data.id);
                                  setgradeditedValue(data.term_description);
                                  gradeedit.setValues(data.term_description);
                                }}
                              >
                                Edit
                              </Button>

                              <Button
                                variant="secondary"
                                onClick={() => gradeDelete(data.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
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

export default Term;
