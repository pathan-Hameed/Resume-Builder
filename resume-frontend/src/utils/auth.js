export const getToken = () => localStorage.getItem("token");
export function isAuthenticated() {
  return !!localStorage.getItem("token");
}
