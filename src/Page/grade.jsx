import Sidebar from "../Common/Sidebar";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useStateValue } from ".././Common/stateprovider";
import axios from "axios";
import Mapprovider from "../Common/mapprovider";
function grade() {
  const [initialState] = useStateValue();
  console.log("ytryrystrysrystrsty", initialState);
  const token = sessionStorage.getItem("Token");
  const [data, setdata] = useState([]);
  const [gradeeditedRowId, setgradeEditedRowId] = useState(null);
  const [gradeeditedValue, setgradeditedValue] = useState([]);

  useEffect(() => {
    if (initialState?.settingid !== "") {
      getGradeList();
    }
  }, [initialState]);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const Gradeadd = useFormik({
    initialValues: {
      description: "",
      settingId: initialState?.settingid?.setting_id,
    },
    onSubmit: async (values) => {
      let sendData = {
        description: values.description,
        settingId: Number(initialState?.settingid),
      };

      axios
        .post(
          "https://de-dev-api.theecentral.com/api/grade/add-grade",
          sendData,
          config
        )
        .then(
          (response) => {
            if (response?.status === 200 || response?.status === 201) {
              Gradeadd.resetForm();
              toast.success("Grade Added Successfully");
              // alert("Grade Added Successfully");
              getGradeList();
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
      description: gradeeditedValue.description,
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      let sendData = {
        description: gradeeditedValue,
      };
      console.log(gradeeditedValue);

      axios
        .put(
          `https://de-dev-api.theecentral.com/api/grade/update-grade/${gradeeditedRowId}`,
          sendData,
          config
        )
        .then(
          (response) => {
            if (response?.status === 200 || response?.status === 201) {
              gradeedit.setValues(response?.gradeeditedValue);
              setgradeEditedRowId(null);
              Gradeadd.resetForm();
              toast.success("Grade Updated Successfully");

              getGradeList();
            } else {
              // alert("eerrror");
              // toast.success("Grade Updated Successfully"); 
            }
          },
          (error) => {
            console.log(error);
          }
        );
    },
  });

  const getGradeList = async () => {
    axios
      .get(
        `https://de-dev-api.theecentral.com/api/grade/get-all/${initialState?.settingid}`,
        config
      )
      .then(function (response) {
        if (response?.status === 200) {
          setdata(response?.data);

          console.log("ddddddddddddddddddddddddddddddd", response.data);
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
        `https://de-dev-api.theecentral.com/api/grade/grade-inactive/${id}`,
        // config,
        sendData,
        config
      )
      .then(
        (response) => {
          if (response?.status === 200 || response?.status === 201) {
            getGradeList();
            alert("Grade Delete Successfully");
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
            <div className="navbar-header">Grade</div>
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
                  <label for="ContactName">Grade &nbsp;</label>
                </div>
                <div className="col-md-2 ">
                  <input
                    name="description"
                    placeholder="Enter Grade"
                    formControlName="description"
                    id="description"
                    onChange={Gradeadd.handleChange}
                    onBlur={Gradeadd.handleBlur}
                    value={Gradeadd.values.description.replace(
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
                    onClick={Gradeadd.handleSubmit}
                    disabled={Gradeadd.values.description === ""}
                  >
                    <i className="fas fa-plus"></i>

                    <div className="pl10"> ADD </div>
                  </button>{" "}
                </div>

                {Gradeadd.touched.description && Gradeadd.errors.description ? (
                  <p className="error_text text-danger">
                    {Gradeadd.errors.description}
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
                      <th style={{ width: "70%" }}>Grade</th>
                      <th style={{ width: "20%" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.data?.map((data, index) => (
                      <tr key={data.id}>
                        <td scope="row">{index + 1}</td>

                        <td>
                          {gradeeditedRowId === data.id ? (
                            <input
                              type="text"
                              name="description"
                              className="form-control"
                              placeholder="Grade"
                              value={gradeeditedValue}
                              onChange={(e) =>
                                setgradeditedValue(e.target.value)
                              }
                            />
                          ) : (
                            <span>{data.description}</span>
                          )}
                        </td>

                        <td>
                          {gradeeditedRowId === data.id ? (
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
                                  setgradeEditedRowId(null);
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
                                  setgradeEditedRowId(data.id);
                                  setgradeditedValue(data.description);
                                  gradeedit.setValues(data.description);
                                }}
                              >
                                <i class="fa fa-pencil-square-o"></i>
                              </button>

                              <button
                                className="btn btn-outline-danger"
                                type="button"
                                onClick={() => gradeDelete(data.id)}
                              >
                                <i class="fa fa-trash"></i>
                              </button>
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

export default grade;
