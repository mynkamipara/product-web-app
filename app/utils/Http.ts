// /* eslint-disable no-console */
// import axios from "axios";
// import histroy from "./histroy";
// const API_URL = 'http://localhost:8080';
// // const { Storage } = require("../../config/lib");
// const version = "";

// axios.interceptors.request.use(async (config: any) => {
// //   const token = await Storage.getItem("token");
//   const token = localStorage.getItem('token');
//   console.log("token",token)
//   config.baseURL = API_URL;
//   config.headers = {
//     common: {
//       "Access-Control-Allow-Origin": API_URL,
//       Accept: "application/json",
//       "X-Requested-With": "XMLHttpRequest",
//     },
//   };
//   config.headers.authorization = token ? `Bearer ${token}` : "";
//   return config;
// });

// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.message === "Network Error") {
//       error.response = {
//         status: 500,
//         data: {
//           message: "Network Error | Network Unavailable",
//         },
//       };
//     }
//     if (error.response.status === 401) {
//     //   Storage.removeItem("token");
//       localStorage.getItem('token');

//         // history.push("/login");
//     }
//     if (error.response.status === 500) {
//       if (!error.response.data || !error.response.data.message) {
//         error.response = {
//           status: 500,
//           data: {
//             message: "Something went wrong",
//           },
//         };
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default axios;
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-type": "application/json"
  }
});