module.exports = {
  getToken() {
    return localStorage.token;
  },
  logout() {
    delete localStorage.token;
    delete localStorage.places;
  },
  loggedIn() {
    return !!localStorage.token;
  }
};
