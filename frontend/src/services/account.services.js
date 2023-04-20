export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function logout() {
  localStorage.removeItem("token");
}

export function isLogged() {
  const token = localStorage.getItem("token");
  return !!token;
}
