import React, { useState } from "react";
import "./AddProduct.css";
import ProductServices from "../../services/ProductServices";

import DefaultImage from "../Asserts/img.png";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function AddProduct() {
  const [Image, setImage] = useState(DefaultImage);
  const [Data, setData] = useState({
    ProductName: "",
    ProductDescription: "",
    ProductType: "",
    ProductCompany: "",
    ProductPrice: "",
    Quantity: "",
  });

  const handleCapture = (event) => {
    const { name } = event.target;
    console.log("Name : ", name);
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <div className="AddProduct-Container">
      <div className="AddProduct-SubContainer">
        <div className="AddProduct-Box1">
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
            placeholder="Ex. Mobile, Book"
            style={{ margin: "10px 0 10px 30px", width: "80%" }}
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
            placeholder="Ex. Electronic, Book"
            style={{ margin: "10px 0 10px 30px", width: "80%" }}
            value={Data.ProductType}
            onChange={(e) => {
              setData({ ...Data, ProductType: e.target.value });
            }}
          />
          <TextField
            size="small"
            label="Product Price"
            variant="outlined"
            placeholder="Ex. 1000 "
            style={{ margin: "10px 0 10px 30px", width: "80%" }}
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
            value={Data.Quantity}
            onChange={(e) => {
              setData({ ...Data, Quantity: e.target.value });
            }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "10px 0 0px 30px", width: "80%" }}
          >
            Add Product
          </Button>
        </div>
      </div>
    </div>
  );
}
