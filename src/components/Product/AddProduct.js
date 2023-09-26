import React, { useEffect, useState } from "react";
import "./AddProduct.css";
import ProductServices from "../../services/ProductServices";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import DefaultImage from "../Asserts/img.png";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

const productServices = new ProductServices();

export default function AddProduct(props) {
  const [Message, setMessage] = useState("");
  const [OpenLoader, setOpenLoader] = useState(false);
  const [OpenSnackBar, setOpenSnackBar] = useState(false);
  const [Image, setImage] = useState(DefaultImage);
  const [Data, setData] = useState({
    Image: new FormData(),
    IsImageEdited: false,
    ProductID: 0,
    ProductName: "",
    ProductDescription: "",
    ProductType: "",
    ProductCompany: "",
    ProductPrice: "",
    Quantity: "",
  });

  const [ImageFlag, setImageFlag] = useState(false);
  const [ProductName, setProductName] = useState(false);
  const [ProductType, setProductType] = useState(false);
  const [ProductPrice, setProductPrice] = useState(false);
  const [Quantity, setQuantity] = useState(false);
  const [IsEdit, setIsEdit] = useState(false);

  useEffect(() => {
    debugger;
    if (localStorage.getItem("IsEdit") === "true") {
      setIsEdit(true);
      /*
      insertionDate: null
      isActive: true
      isArchive: false
      productCompany: "Test1"
      productDetails: "Test1"
      productID: 4
      productImageUrl: "http://res.cloudinary.com/dzavgoc9w/image/upload/v1693126419/dcdxpuuvpr8mpseirurw.jpg"
      productName: "Test1"
      productPrice: "100"
      productType: "Test1"
      publicId: "fb8cd7dd-2006-45e1-b413-71f4e44b8e52"
      quantity: 5
      updateDate: null
      */
      var _data = JSON.parse(localStorage.getItem("productDataObject"));
      setImage(_data.productImageUrl);
      setData({
        ...Data,
        ProductID: _data.productID,
        ProductName: _data.productName,
        ProductDescription: _data.productDetails,
        ProductType: _data.productType,
        ProductCompany: _data.productCompany,
        ProductPrice: _data.productPrice,
        Quantity: _data.quantity,
      });
    } else {
      localStorage.setItem("IsEdit", false);
      localStorage.setItem("productDataObject", null);
      setIsEdit(false);
      
    }
  }, []);

  const handleCapture = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
    setData({ ...Data, Image: event.target.files[0], IsImageEdited: true });
  };

  const CheckValidity = async () => {
    console.log("Check Validity Calling....");
    setImageFlag(false);
    setProductName(false);
    setProductType(false);
    setProductPrice(false);
    setQuantity(false);
    if (Data.ProductName === "") {
      console.log("Product Name Empty");
      setProductName(true);
    }

    if (Data.ProductType === "") {
      console.log("Product Type Empty");
      setProductType(true);
    }

    if (Data.ProductPrice === "") {
      console.log("Product Price Empty");
      setProductPrice(true);
    }

    if (Number(Data.Quantity) <= 0) {
      console.log("Quantity Empty");
      setQuantity(true);
    }

    if (Image === DefaultImage) {
      console.log("Image Empty");
      setImageFlag(true);
    }
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const handleAddProduct = async () => {
    await CheckValidity();
    if (Image === DefaultImage) {
      console.log("Please enter Product Image");
      return;
    }
    if (
      ProductName === false &&
      ProductType === false &&
      ProductPrice === false &&
      Quantity === false
    ) {
      setOpenLoader(true);
      const data1 = new FormData();
      data1.append("file", Data.Image);
      data1.append("productName", Data.ProductName);
      data1.append("productType", Data.ProductType);
      data1.append("productPrice", Data.ProductPrice);
      data1.append("productDetails", Data.ProductDescription);
      data1.append("productCompany", Data.ProductCompany);
      data1.append("quantity", Data.Quantity);

      let data = {
        productName: Data.ProductName,
        productType: Data.ProductType,
        productPrice: Data.ProductPrice,
        productDetails: Data.ProductDescription,
        productCompany: Data.ProductCompany,
        quantity: Number(Data.Quantity),
        file: Data.Image,
      };
      productServices
        .AddProduct(data1)
        .then((data) => {
          console.log(" AddProduct Data : ", data);
          setOpenLoader(false);
          setOpenSnackBar(true);
          setMessage(data.message);
          props.handleOpenHomeNav();
        })
        .catch((error) => {
          console.log("AddProduct Error : ", error);
          setOpenLoader(false);
          setOpenSnackBar(true);
          setMessage("Something Went Wrong");
        });
      console.log("Acceptable : Data ", data);
    } else {
      console.log("Please Fill Required Field. Data : ", Data);
    }
  };

  const handleEditProduct = async () => {
    await CheckValidity();
    if (Image === DefaultImage) {
      console.log("Please enter Product Image");
      return;
    }
    if (
      ProductName === false &&
      ProductType === false &&
      ProductPrice === false &&
      Quantity === false
    ) {
      debugger;
      setOpenLoader(true);
      const data1 = new FormData();
      if (Data.IsImageEdited) {
        data1.append("file", Data.Image);
      }
      data1.append("isImageEdit", Data.IsImageEdited ? "TRUE" : "FALSE");
      data1.append("productID", Data.ProductID);
      data1.append("productName", Data.ProductName);
      data1.append("productType", Data.ProductType);
      data1.append("productPrice", Data.ProductPrice);
      data1.append("productDetails", Data.ProductDescription);
      data1.append("productCompany", Data.ProductCompany);
      data1.append("quantity", Data.Quantity);

      productServices
        .UpdateProduct(data1)
        .then((data) => {
          console.log(" AddProduct Data : ", data);
          setOpenLoader(false);
          setOpenSnackBar(true);
          setMessage(data.message);
          localStorage.setItem("IsEdit", false);
          localStorage.setItem("productDataObject", null);
          props.handleOpenHomeNav();
        })
        .catch((error) => {
          console.log("AddProduct Error : ", error);
          setOpenLoader(false);
          setOpenSnackBar(true);
          setMessage("Something Went Wrong");
        });
    } else {
      console.log("Please Fill Required Field. Data : ", Data);
    }
  };

  const handleCancelProduct = async () => {
    localStorage.setItem("IsEdit", false);
    localStorage.setItem("productDataObject", null);
    setData({
      ...Data,
      Image: new FormData(),
      IsImageEdited: false,
      ProductID: 0,
      ProductName: "",
      ProductDescription: "",
      ProductType: "",
      ProductCompany: "",
      ProductPrice: "",
      Quantity: "",
    });
    setIsEdit(false);
    setImage(DefaultImage);
  };

  return (
    <div className="AddProduct-Container">
      <div className="AddProduct-SubContainer">
        <div
          className="AddProduct-Box1"
          style={
            ImageFlag
              ? { border: "0.5px solid red" }
              : { border: "0.5px solid lightgray" }
          }
        >
          <div className="ImageField">
            <img
              src={Image}
              alt="Product-Image"
              style={{ height: "90%", width: "100%" }}
            />
          </div>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleCapture}
          />
          <label
            htmlFor="contained-button-file"
            style={{ margin: "10px 0 0 0" }}
          >
            <Button variant="contained" color="primary" component="span">
              Upload Image
            </Button>
          </label>
        </div>
        <div
          className="AddProduct-Box2"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            size="small"
            label="Product Name"
            variant="outlined"
            placeholder="Ex.Book"
            style={{ margin: "10px 0 10px 30px", width: "80%" }}
            error={ProductName}
            value={Data.ProductName}
            onChange={(e) => {
              setData({ ...Data, ProductName: e.target.value });
            }}
          />
          <TextField
            multiline
            rows={5}
            size="small"
            label="Product Description"
            variant="outlined"
            style={{ margin: "10px 0 10px 30px", width: "80%" }}
            value={Data.ProductDescription}
            onChange={(e) => {
              setData({ ...Data, ProductDescription: e.target.value });
            }}
          />
          <TextField
            size="small"
            label="Product Type"
            variant="outlined"
            placeholder="Ex. Health, Biography"
            style={{ margin: "10px 0 10px 30px", width: "80%" }}
            error={ProductType}
            value={Data.ProductType}
            onChange={(e) => {
              setData({ ...Data, ProductType: e.target.value });
            }}
          />
          <TextField
            type="number"
            size="small"
            label="Product Price"
            variant="outlined"
            placeholder="Ex. 1000 "
            style={{ margin: "10px 0 10px 30px", width: "80%" }}
            error={ProductPrice}
            value={Data.ProductPrice}
            onChange={(e) => {
              setData({ ...Data, ProductPrice: e.target.value });
            }}
          />
          <TextField
            size="small"
            label="Company"
            variant="outlined"
            placeholder="Ex. Sony, Tata"
            style={{ margin: "10px 0 10px 30px", width: "80%" }}
            value={Data.ProductCompany}
            onChange={(e) => {
              setData({ ...Data, ProductCompany: e.target.value });
            }}
          />
          <TextField
            size="small"
            label="Quantity"
            variant="outlined"
            type="number"
            placeholder="Ex. 12"
            style={{ margin: "10px 0 10px 30px", width: "80%" }}
            error={Quantity}
            value={Data.Quantity}
            onChange={(e) => {
              setData({ ...Data, Quantity: e.target.value });
            }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "10px 0 0px 30px", width: "80%" }}
            onClick={() => {
              IsEdit ? handleEditProduct() : handleAddProduct();
            }}
          >
            {IsEdit ? <>Edit Product</> : <>Add Product</>}
          </Button>
          <Button
            variant="contained"
            // color="primary"
            style={{ margin: "10px 0 0px 30px", width: "80%" }}
            onClick={() => {
              handleCancelProduct();
            }}
          >
            <>Cancel</>
          </Button>
        </div>
      </div>
      <Backdrop style={{ zIndex: "1", color: "#fff" }} open={OpenLoader}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={OpenSnackBar}
        autoHideDuration={2000}
        onClose={handleSnackBarClose}
        message={Message}
        action={
          <React.Fragment>
            <Button
              color="secondary"
              size="small"
              onClick={handleSnackBarClose}
            >
              UNDO
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackBarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
