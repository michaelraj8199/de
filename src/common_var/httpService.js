import { env_variables } from "./env";
import HttpHandler from "./httpHandler";
let token = sessionStorage.getItem("token");

export const geturl = (url) => {
  console.log("Process env: ", process.env.REACT_APP_ADMIN_API_URL);
  return `${process.env.REACT_APP_ADMIN_API_URL}/${url}`;
};


export const AuthPost = async (url, body) => {
  token = sessionStorage.getItem("token");
  let optionalHeaders = {
    Authorization: `Bearer ${token}`,
  };

  let activeUrl = geturl(url);
  let data = await HttpHandler.post(activeUrl, body, optionalHeaders);
  return data;
};

export const AuthPatch = async (url, body) => {
  let token;
  token = sessionStorage.getItem("admin_token");

  let optionalHeaders = {
    Authorization: token ? `Bearer ${token}` : "",
  };

  let activeUrl = geturl(url);
  let data = await HttpHandler.patch(activeUrl, body, optionalHeaders);
  // console.log(data);
  return data;
};

export const AuthGet = async (url) => {
  let optionalHeaders = {
    Authorization: `Bearer ${token}`,
  };
  let activeUrl = geturl(url);
  let data = await HttpHandler.get(activeUrl, "", optionalHeaders);
  return data;
};

export const Get = async (url) => {
  let activeUrl = geturl(url);
  let data = await HttpHandler.get(activeUrl, "", {});
  return data;
};

export const Post = async (url, body) => {
  console.log(url);
  console.log(body);
  let activeUrl = geturl(url);
  console.log(activeUrl);
  let data = await HttpHandler.post(activeUrl, body);
  console.log("6fghgfhgfhfh",HttpHandler.post)
  console.log(data);
  return data;
};

export const AuthPut = async (url,body) => {
  let optionalHeaders = {
    Authorization: token ? `Bearer ${token}` : "",
  };
  //console.log(url);
  let activeUrl = geturl(url);
  let data = await HttpHandler.put(activeUrl, body, optionalHeaders);
  // console.log(data);
  return data;
};


