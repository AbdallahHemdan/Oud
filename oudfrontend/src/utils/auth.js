import jwtDecode from 'jwt-decode';

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

const _config = config;
export { _config as config };
export const token = getToken();
const _Auth = Auth;
export { _Auth as Auth };
const _isLoggedIn = isLoggedIn;
export { _isLoggedIn as isLoggedIn };
