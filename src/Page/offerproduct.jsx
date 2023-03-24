
import Sidebar from "../Common/Sidebar";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useStateValue } from ".././Common/stateprovider";
import axios from "axios";
import Mapprovider from "../Common/mapprovider";


function offerproduct() {
  const [initialState] = useStateValue();
  console.log("ytryrystrysrystrsty", initialState);
  const token = sessionStorage.getItem("Token");
  const [data, setdata] = useState([]);
  const [offerproducteditedRowId, setofferproductEditedRowId] = useState(null);
  const [offerproducteditedValue, setgradeditedValue] = useState([]);

  useEffect(() => {
    if (initialState?.settingid !== "") {
      getofferproductList();
    }
  }, [initialState]);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const Offeradd = useFormik({
    initialValues: {
      offerLabel: "",
      settingId: initialState?.settingid?.setting_id,
    },
    onSubmit: async (values) => {
      let sendData = {
        offerLabel: values.offerLabel,
        settingId: Number(initialState?.settingid),
      };

      axios
        .post(
          "https://de-dev-api.theecentral.com/api/offer-products/add-offer",
          sendData,
          config
        )
        .then(
          (response) => {
            if (response?.status === 200 || response?.status === 201) {
              Offeradd.resetForm();
              alert("Offer Product Added Successfully");
              getofferproductList();
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
      offer_label: offerproducteditedValue.offer_label,
    },
    onSubmit: async (values) => {
      let sendData = {
        offerLabel: offerproducteditedValue,
        settingId: Number(initialState?.settingid)

      };
      console.log(offerproducteditedValue);

      axios
        .put(
          `https://de-dev-api.theecentral.com/api/offer-products/update-offer/${offerproducteditedRowId}`,
          sendData,
          config
        )
        .then(
          (response) => {
            if (response?.status === 200 || response?.status === 201) {
              gradeedit.setValues(response?.offerproducteditedValue);
              setofferproductEditedRowId(null);
              // getofferproductList();
              Offeradd.resetForm();
              alert("Offer product Updated Successfully");
              getofferproductList();
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

  const getofferproductList = async () => {
    axios
      .get(
        `https://de-dev-api.theecentral.com/api/offer-products/get-all-offers/${initialState?.settingid}`,
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
        `https://de-dev-api.theecentral.com/api/offer-products/offer-inactive/${id}`,
        // config,
        sendData,config
      )
      .then(
        (response) => {
          if (response?.status === 200 || response?.status === 201) {
            getofferproductList();
            alert("Offer product Delete Successfully");
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
            <div className="navbar-header">Offer Product</div>
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
                  <label for="ContactName">Offer Product</label>
                </div>
                <div className="col-md-2 ">
                  <input
                    name="offerLabel"
                    placeholder="Enter Grade"
                    formControlName="offerLabel"
                    id="offerLabel"
                    onChange={Offeradd.handleChange}
                    onBlur={Offeradd.handleBlur}
                    value={Offeradd.values.offerLabel.replace(
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
                    onClick={Offeradd.handleSubmit}
                    disabled={Offeradd.values.offerLabel === ""}
                  >
                    <i className="fas fa-plus"></i>

                    <div className="pl10"> ADD </div>
                  </button>{" "}
                </div>

                {Offeradd.touched.offer_label && Offeradd.errors.offer_label ? (
                  <p className="error_text text-danger">
                    {Offeradd.errors.offer_label}
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
                      <th style={{ width: "70%" }}>Offer Product</th>
                      <th style={{ width: "20%" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.data?.map((data, index) => (
                      <tr key={data.id}>
                        <td scope="row">{index + 1}</td>

                        <td>
                          {offerproducteditedRowId === data.id ? (
                            <input
                              type="text"
                              name="offer_label"
                              className="form-control"
                              placeholder="Grade"
                              value={offerproducteditedValue}
                              onChange={(e) =>
                                setgradeditedValue(e.target.value)
                              }
                            />
                          ) : (
                            <span>{data.offer_label}</span>
                          )}
                        </td>

                        <td>
                          {offerproducteditedRowId === data.id ? (
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
                                  setofferproductEditedRowId(null);
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
                                  setofferproductEditedRowId(data.id);
                                  setgradeditedValue(data.offer_label);
                                  gradeedit.setValues(data.offer_label);
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

  )
}

export default offerproduct