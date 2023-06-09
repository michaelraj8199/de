// const axios = require("axios");
// import axios from "axios";
const axios = require("axios");


const createHandler = (method) => {
  return async function (url, body) {
    

     const config = {
      method,
      url,
      data: body,
    };
    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }

  };
};

const HttpHandler = {
  get: createHandler("get"),
  post: createHandler("post"),
  put: createHandler("put"),
  patch: createHandler("patch"),
  delete: createHandler("delete"),

};

export default HttpHandler
