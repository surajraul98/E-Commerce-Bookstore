const ParentConfiguration = require("./ParentConfiguration");

module.exports = {
  AddProduct: ParentConfiguration.Parent + "",
  GetAllProduct: ParentConfiguration.Parent + "",
  GetProductByID: ParentConfiguration.Parent + "",
  GetProductByName: ParentConfiguration.Parent + "",
  UpdateProduct: ParentConfiguration.Parent + "",
  ProductMoveToArchive: ParentConfiguration.Parent + "",
  GetArchiveProduct: ParentConfiguration.Parent + "",
  ProductMoveToTrash: ParentConfiguration.Parent + "",
  GetTrashProduct: ParentConfiguration.Parent + "",
  ProductDeletePermenently: ParentConfiguration.Parent + "",
  ProductRestore: ParentConfiguration.Parent + "",
};
