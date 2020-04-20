const jwtDecode = require('jwt-decode');

function getToken() {
  return localStorage.getItem('accessToken');
}

const config = {
  headers: { Authorization: `Bearer ${getToken()}` },
};

function Auth() {
  try {
    if (!getToken()) return null;
    let decoded = jwtDecode(getToken());
    return decoded.id;
  } catch {
    return null;
  }
}
function isLoggedIn() {
  return (getToken()) ? true : false;
}

exports.config = config;
exports.token = getToken();
exports.Auth = Auth;
exports.isLoggedIn = isLoggedIn;
