import axios from "axios";
const getRequest = (endpoint) => {
  return axios.get(endpoint);
};
/**
 * Axios DELETE request
 * @function
 * @param {string} endpoint the required endpoint to implement an action
 * @returns {object}
 */
const deleteRequest = (endpoint) => {
  return axios.delete(endpoint);
};
/**
 * Axios PUT request
 * @function
 * @param {string} endpoint the required endpoint to implement an action
 * @param {object} body the request body
 * @returns {object}
 */
const putRequest = (endpoint, body = {}) => {
  return axios.put(endpoint, body);
};
/**
 * Axios POST request
 * @function
 * @param {string} endpoint the required endpoint to implement an action
 * @param {object} body the request body
 * @returns {object}
 */
const postRequest = (endpoint, body = {}) => {
  return axios.post(endpoint, body);
};
/**
 * Axios PATCH request
 * @function
 * @param {string} endpoint the required endpoint to implement an action
 * @param {object} body the request body
 * @returns {object}
 */
const patchRequest = (endpoint, body = {}) => {
  return axios.patch(endpoint, body);
};
export { getRequest, deleteRequest, putRequest, postRequest, patchRequest };
