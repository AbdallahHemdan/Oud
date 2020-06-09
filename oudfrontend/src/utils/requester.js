import axios from "axios";
import { isLoggedIn } from "./../utils/auth";
const config = {
  headers: {
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTA3ZGIwYTA2NDVmNDU4MTYwNzYwNiIsImlhdCI6MTU5MTYyMTQxOSwiZXhwIjoxNTk0MjEzNDE5fQ.fj3N3Pc89Pf_xlt7fGmXw1SINTecUB4-y3pihAAPjC8`,
    "Access-Control-Allow-Origin": "*"
  }
};
const getRequest = endpoint => {
  return axios.get(endpoint, config);
};
/**
 * Axios DELETE request
 * @function
 * @param {string} endpoint the required endpoint to implement an action
 * @returns {object}
 */
const deleteRequest = endpoint => {
  return axios.delete(endpoint, config);
};
/**
 * Axios PUT request
 * @function
 * @param {string} endpoint the required endpoint to implement an action
 * @param {object} body the request body
 * @returns {object}
 */
const putRequest = (endpoint, body = {}) => {
  return axios.put(endpoint, body, config);
};
/**
 * Axios POST request
 * @function
 * @param {string} endpoint the required endpoint to implement an action
 * @param {object} body the request body
 * @returns {object}
 */
const postRequest = (endpoint, body = {}) => {
  return axios.post(endpoint, body, config);
};
/**
 * Axios PATCH request
 * @function
 * @param {string} endpoint the required endpoint to implement an action
 * @param {object} body the request body
 * @returns {object}
 */
const patchRequest = (endpoint, body = {}) => {
  return axios.patch(endpoint, body, config);
};

// const isArtist = () => {
//   if (isLoggedIn()) {
//   }
// };
export { getRequest, deleteRequest, putRequest, postRequest, patchRequest };
