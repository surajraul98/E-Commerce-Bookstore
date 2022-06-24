const ParentConfiguration = require("./ParentConfiguration");

module.exports = {
  AddToCard: ParentConfiguration.Parent + "api/Card/AddToCard",
  GetAllCardDetails: ParentConfiguration.Parent + "api/Card/GetAllCardDetails",
  RemoveCartProduct: ParentConfiguration.Parent + "api/Card/RemoveCartProduct",
  OrderProduct: ParentConfiguration.Parent + "api/Card/OrderProduct",
  GetOrderProduct:ParentConfiguration.Parent + "api/Card/GetOrderProduct",
  CancleOrder:ParentConfiguration.Parent +"api/Card/CancleOrder"
};
