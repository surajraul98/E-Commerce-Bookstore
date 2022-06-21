const ParentConfiguration = require("./ParentConfiguration");

module.exports = {
  SignUp: ParentConfiguration.Parent + "api/Auth/SignUp",
  SignIn: ParentConfiguration.Parent + "api/Auth/SignIn",
  // SignUp: "https://localhost:44381/api/Auth/SignUp",
  // SignIn: "https://localhost:44381/api/Auth/SignIn",
};
