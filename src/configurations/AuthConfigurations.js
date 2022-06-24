const ParentConfiguration = require("./ParentConfiguration");

module.exports = {
  SignUp: ParentConfiguration.Parent + "api/Auth/SignUp",
  SignIn: ParentConfiguration.Parent + "api/Auth/SignIn",
  // SignUp: "https://localhost:44381/api/Auth/SignUp",
  // SignIn: "https://localhost:44381/api/Auth/SignIn",
  AddCustomerDetail: ParentConfiguration.Parent + "api/Auth/AddCustomerDetail",
  CustomerList: ParentConfiguration.Parent + "api/Auth/CustomerList",
  AddCustomerAdderess:
    ParentConfiguration.Parent + "api/Auth/AddCustomerAdderess",
  GetCustomerAdderess:
    ParentConfiguration.Parent + "api/Auth/GetCustomerAdderess/?UserID=",
  GetCustomerDetail:
    ParentConfiguration.Parent + "api/Auth/GetCustomerDetail?UserID=",
};
