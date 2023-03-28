import Sidebar from "../Common/Sidebar";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useStateValue } from ".././Common/stateprovider";
import axios from "axios";
import Mapprovider from "../Common/mapprovider";

function Productvalue() {
  const [initialState] = useStateValue();
  const token = sessionStorage.getItem("Token");
  const [data, setdata] = useState([]);
  const [productvalue, setproductvalue] = useState([]);
  const [offer, setoffer] = useState([]);
  const [productEdit, setProductEdit] = useState(null);
  const [productEditValue, setProductEditValue] = useState();

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
      offerId: "",
      offerValue: "",
      settingId: initialState?.settingid?.setting_id,
    },
    onSubmit: async (values) => {
      if (values.offerId === "default") {
        toast.error("Offer Value Is Required");
        return;
      }
      values.offerValue = parseInt(values.offerValue);
      values.offerId = parseInt(values.offerId);
      values.settingId = Number(initialState?.settingid);

      axios
        .post(
          "http://localhost:8000/api/product-value/add-offervalue",
          values,
          config
        )
        .then(
          (response) => {
            if (response?.status === 200 || response?.status === 201) {
              Productvalueadd.resetForm();
              toast.success("Product Value Added Successfully");

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


  const editProduct = useFormik({
    initialValues: {
      offerValue: productEditValue?.offerValue
        ? productEditValue?.offerValue
        : "",
      offerId: productEditValue?.offerId ? productEditValue?.offerId : "",
    },
    enableReinitialize: true,
    // validationSchema: productOfferValidations,
    onSubmit: async (values) => {
      if (values.offerId === "default") {
        toast.error("Offer Value Is Required", { duration: 4000 });
        return;
      }
      values.offerValue = parseInt(values.offerValue);
      values.offerId = parseInt(values.offerId);
      values.settingId = Number(initialState?.settingid);
      
      axios
      .put(
        `http://localhost:8000/api/product-value/update-offervalue/${productEditValue?.id}`,
        values,
        config
      ).then((res) => {
        if (res?.status === 200) {
          setProductEdit(null);
          toast.success(res.message, { duration: 4000 });
          getProductvalueList();
        } else {
          toast.error(res.message, { duration: 4000 });
        }
      });
    },
  });



  const getProductvalueList = async () => {
    axios
      .get(
        `http://localhost:8000/api/product-value/get-all-offervalue/${initialState?.settingid}`,
        config
      )
      .then(function (response) {
        if (response?.status === 200) {
          setdata(response?.data);
          setproductvalue(response?.data.products);
          setoffer(response?.data.offers);

          
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
        `http://localhost:8000/api/grade/grade-inactive/${id}`,
        // config,
        sendData,
        config
      )
      .then(
        (response) => {
          if (response?.status === 200 || response?.status === 201) {
            getProductvalueList();
            toast.success("Grade Delete Successfully");

            
          } else {
            alert("eerrror");
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const deleteoffer = async (data) => {
    let sendData = {
      active: false,
      offerId: data?.product_id,
      settingId: +initialState?.settingid,
    };
    
    axios
      .put(
        `http://localhost:8000/api/product-value/offervalue-inactive/${data.id}`,
        // config,
        sendData,
        config
      )
      .then((response) => {
        if (response?.status === 200|| response?.status === 201) {
          toast.success("product value");
          getProductvalueList();
        } else {
          toast.error("please fill details ");
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
            <div className="navbar-header">Product Name </div>
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
                    <label for="ContactName">Offer Name</label>
                    <select
                      className="form-select"
                      name="offerId"
                      onChange={Productvalueadd.handleChange}
                      onBlur={Productvalueadd.handleBlur}
                      value={Productvalueadd.values.offerId}
                    >
                      <option defaultValue value="default">
                        Select Offer
                      </option>
                      {offer?.map((offers) => (
                        <option value={offers?.id}>
                          {offers?.offer_label}
                        </option>
                      ))}
                    </select>
                    {Productvalueadd.touched.offerId &&
                    Productvalueadd.errors.offerId ? (
                      <span className="error_text text-danger">
                        {Productvalueadd.errors.offerId}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-2 ">
                  {" "}
                  <label for="ContactName">Offer value &nbsp;</label>
                </div>
                <div className="col-md-2 ">
                  <input
                    name="offerValue"
                    className="form-control"
                    placeholder="Enter Offer Value"
                    id="offerValue"
                    onChange={(e) => {
                      Productvalueadd.setFieldValue(
                        "offerValue",
                        e.target.value.replace(/[^0-9]/g, "")
                      );
                    }}
                    onBlur={Productvalueadd.handleBlur}
                    value={Productvalueadd.values.offerValue}
                  />
                  {Productvalueadd.touched.offerValue &&
                  Productvalueadd.errors.offerValue ? (
                    <span className="error_text text-danger">
                      {Productvalueadd.errors.offerValue}
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
                      <th style={{ width: "70%" }}>Product Name</th>
                      <th style={{ width: "70%" }}>Value</th>

                      <th style={{ width: "20%" }}>Action</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    {offer?.length > 0 ? (
                      offer?.map((data, index) => (
                        <tr key={data.id}>
                          <td>{index + 1}</td>
                          <td>
                            {productEdit === index ? (
                              <>
                                <label for="ContactName">Offer Name</label>
                                <select
                                  className="form-select"
                                  name="offerId"
                                  onChange={(e) => {
                                    setProductEditValue({
                                      ...productEditValue,
                                      offerId: e.target.value,
                                    });
                                  }}
                                  onBlur={editProduct.handleBlur}
                                  value={editProduct.values.offerId}
                                >
                                  <option defaultValue value="default">
                                    Select Offer
                                  </option>
                                  {productvalue?.map((offers) => (
                                    <option value={offers?.id}>
                                      {offers?.offer_label}
                                    </option>
                                  ))}
                                </select>

                                {editProduct.touched.offerId &&
                                editProduct.errors.offerId ? (
                                  <p className="error_text text-danger">
                                    {editProduct.errors.offerId}
                                  </p>
                                ) : null}
                              </>
                            ) : (
                              <span>{data?.offer_label}</span>
                            )}
                          </td>

                          <td>
                            {productEdit === index ? (
                              <>
                                <input
                                  name="offerValue"
                                  className="form-control"
                                  placeholder="Enter To Score"
                                  id="editProductValue"
                                  onChange={(e) => {
                                    setProductEditValue({
                                      ...productEditValue,
                                      offerValue: e.target.value,
                                    });
                                  }}
                                  onBlur={editProduct.handleBlur}
                                  value={editProduct.values.offerValue}
                                />

                                {editProduct.touched.offerValue &&
                                editProduct.errors.offerValue ? (
                                  <p className="error_text text-danger">
                                    {editProduct.errors.offerValue}
                                  </p>
                                ) : null}
                              </>
                            ) : (
                              <span>{data?.offer_value}</span>
                            )}
                          </td>

                          <td>
                            {productEdit === index ? (
                              <div>
                                <button
                                  className="btn btn-primary"
                                  type="button"
                                  style={{
                                    marginRight: "10px",
                                  }}
                                  onClick={() => {
                                    editProduct.handleSubmit();
                                  }}
                                >
                                  Save
                                </button>
                                <button
                                  className="btn btn-primary"
                                  type="button"
                                  onClick={() => {
                                    setProductEdit(null);
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
                                    setProductEdit(index);
                                    setProductEditValue({
                                      offerValue: data.offer_value,
                                      offerId: data?.product_id,
                                      id: data.id,
                                    });
                                  }}
                                >
                                  <i className="fa fa-pencil-square-o"></i>
                                </button>

                                <button
                                  className="btn btn-outline-danger"
                                  onClick={() => deleteoffer(data)}
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
                        No Offered Value Available for the Selected Provider
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

export default Productvalue;
