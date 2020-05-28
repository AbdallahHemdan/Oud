import axios from "axios";
const config = {
  headers: {
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTA3ZGFmYTA2NDVmNDU3MTYwNzVmZiIsImlhdCI6MTU4Njg5MzE0MywiZXhwIjoxNTg5NDg1MTQzfQ.ON2Ef2vgOV1_6EokwvD3mlUzgAn0pb5WPCy5qBWj2QA`,
  },
};
const getRequest = (endpoint) => {
  return axios.get(endpoint, config);
};
/**
 * Axios DELETE request
 * @function
 * @param {string} endpoint the required endpoint to implement an action
 * @returns {object}
 */
const deleteRequest = (endpoint) => {
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
export { getRequest, deleteRequest, putRequest, postRequest, patchRequest };
