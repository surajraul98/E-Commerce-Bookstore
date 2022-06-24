import React, { useState } from "react";
import "./GetProduct.scss";
import ProductServices from "../../services/ProductServices";
import CartServices from "../../services/CartServices";
import WishListServices from "../../services/WishListServices";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import DeleteIcon from "@material-ui/icons/Delete";
import ArchiveIcon from "@material-ui/icons/Archive";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import RestoreIcon from "@material-ui/icons/Restore";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";

const productServices = new ProductServices();
const cartServices = new CartServices();
const wishlistServices = new WishListServices();

export default function GetProduct(props) {
  const [Message, setMessage] = useState("");
  const [OpenSnackBar, setOpenSnackBar] = useState(false);
  const [OpenLoader, setOpenLoader] = useState(false);

  const ProductMoveToArchive = async (productID) => {
    setOpenLoader(true);
    let data = {
      productID: productID,
    };
    await productServices
      .ProductMoveToArchive(data)
      .then((data) => {
        console.log("ProductMoveToArchive Data : ", data);
        setMessage(data.data.message);
        setOpenSnackBar(true);
        setOpenLoader(false);
        props.productServices(props.PageNumber);
      })
      .catch((error) => {
        console.log("ProductMoveToArchive Error : ", error);
        setMessage("Something Went Wrong");
        setOpenSnackBar(true);
        setOpenLoader(false);
      });
  };

  const ProductMoveToTrash = async (productID) => {
    setOpenLoader(true);
    let data = {
      productID: productID,
    };
    await productServices
      .ProductMoveToTrash(data)
      .then((data) => {
        console.log("ProductMoveToTrash Data : ", data);
        setMessage(data.data.message);
        setOpenSnackBar(true);
        setOpenLoader(false);
        props.productServices(props.PageNumber);
      })
      .catch((error) => {
        console.log("ProductMoveToTrash Error : ", error);
        setMessage("Something Went Wrong");
        setOpenSnackBar(true);
        setOpenLoader(false);
      });
  };

  //
  const ProductRestore = async (productID) => {
    setOpenLoader(true);
    let data = {
      productID: productID,
    };
    productServices
      .ProductRestore(data)
      .then((data) => {
        console.log("ProductRestore Data : ", data);
        setMessage(data.data.message);
        setOpenSnackBar(true);
        setOpenLoader(false);
        {
          props.State === "Trash"
            ? props.GetTrashList(props.PageNumber)
            : props.GetArchiveList(props.PageNumber);
        }
      })
      .catch((error) => {
        console.log("ProductRestore Error : ", error);
        setMessage("Something Went Wrong");
        setOpenSnackBar(true);
        setOpenLoader(false);
      });
  };

  const ProductDeletePermenently = async (productID) => {
    setOpenLoader(true);
    // let data = {
    //   productID: productID,
    // };
    productServices
      .ProductDeletePermenently(productID)
      .then((data) => {
        console.log("ProductDeletePermenently Data : ", data);
        setMessage(data.data.message);
        setOpenSnackBar(true);
        setOpenLoader(false);
        props.GetTrashList(props.PageNumber);
      })
      .catch((error) => {
        console.log("ProductDeletePermenently Error : ", error);
        setMessage("Something Went Wrong");
        setOpenSnackBar(true);
        setOpenLoader(false);
      });
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const AddToCart = async (ProductID) => {
    setOpenLoader(true);
    let data = {
      productID: ProductID,
      userID: Number(localStorage.getItem("Customer_UserID")),
    };
    await cartServices
      .AddToCard(data)
      .then((data) => {
        console.log("AddToCart Data : ", data);
        setMessage(data.data.message);
        setOpenSnackBar(true);
        setOpenLoader(false);
      })
      .catch((error) => {
        console.log("AddToCart Data : ", error);
        setMessage("Something Went Wrong");
        setOpenSnackBar(true);
        setOpenLoader(false);
      });
  };

  const AddToWishList = async (ProductID) => {
    let data = {
      productID: ProductID,
      userID: localStorage.getItem("Customer_UserID"),
    };
    setOpenLoader(true);
    wishlistServices
      .AddToWishList(data)
      .then((data) => {
        console.log("AddToWishList Data :", data);
        setMessage(data.data.message);
        setOpenSnackBar(true);
        setOpenLoader(false);
      })
      .catch((error) => {
        console.log("AddToWishList Error : ", error);
        setMessage("Something Went Wrong");
        setOpenSnackBar(true);
        setOpenLoader(false);
      });
    setOpenLoader(true);
  };

  const MoveToCart = async (ProductID, WishListID) => {
    let data = {
      productID: ProductID,
      userID: localStorage.getItem("Customer_UserID"),
      wishListID: WishListID,
    };

    setOpenLoader(true);
    wishlistServices
      .MoveToCard(data)
      .then((data) => {
        console.log("MoveToCart Data :", data);
        setMessage(data.data.message);
        setOpenSnackBar(true);
        setOpenLoader(false);
        props.GetAllWishListDetails(props.PageNumber);
      })
      .catch((error) => {
        console.log("MoveToCart Error : ", error);
        setMessage("Something Went Wrong");
        setOpenSnackBar(true);
        setOpenLoader(false);
        props.GetAllWishListDetails(props.PageNumber);
      });
    setOpenLoader(true);
  };

  const RemoveWishList = async (WishListID) => {
    setOpenLoader(true);
    wishlistServices
      .RemoveWishListProduct(WishListID)
      .then((data) => {
        console.log("RemoveWishList Data :", data);
        setMessage(data.data.message);
        setOpenSnackBar(true);
        setOpenLoader(false);
        props.GetAllWishListDetails(props.PageNumber);
      })
      .catch((error) => {
        console.log("RemoveWishList Error : ", error);
        setMessage("Something Went Wrong");
        setOpenSnackBar(true);
        setOpenLoader(false);
        props.GetAllWishListDetails(props.PageNumber);
      });
    setOpenLoader(true);
  };

  const OrderProduct = async (CartID, ProductID) => {
    setOpenLoader(true);
    let data = {
      cartID: CartID,
      productID: ProductID,
    };
    await cartServices
      .OrderProduct(data)
      .then((data) => {
        console.log("OrderProduct Data : ", data);
        setMessage(data.data.message);
        setOpenSnackBar(true);
        setOpenLoader(false);
        props.GetAllCardDetails(props.PageNumber);
      })
      .catch((error) => {
        console.log("OrderProduct Data : ", error);
        setMessage("Something Went Wrong");
        setOpenSnackBar(true);
        setOpenLoader(false);
        props.GetAllCardDetails(props.PageNumber);
      });
  };

  const CancleOrder = async (CartID, ProductID) => {
    setOpenLoader(true);
    let data = {
      cartID: CartID,
      productID: ProductID,
    };
    await cartServices
      .CancleOrder(data)
      .then((data) => {
        console.log("CancleOrder Data : ", data);
        setMessage(data.data.message);
        setOpenSnackBar(true);
        setOpenLoader(false);
        props.GetMyOrderList(props.PageNumber);
      })
      .catch((error) => {
        console.log("CancleOrder Data : ", error);
        setMessage("Something Went Wrong");
        setOpenSnackBar(true);
        setOpenLoader(false);
        props.GetMyOrderList(props.PageNumber);
      });
  };

  const RemoveCart = async (CartID) => {
    setOpenLoader(true);

    await cartServices
      .RemoveCartProduct(CartID)
      .then((data) => {
        console.log("RemoveCartProduct Data : ", data);
        setMessage(data.data.message);
        setOpenSnackBar(true);
        setOpenLoader(false);
        props.GetAllCardDetails(props.PageNumber);
      })
      .catch((error) => {
        console.log("RemoveCartProduct Data : ", error);
        setMessage("Something Went Wrong");
        setOpenSnackBar(true);
        setOpenLoader(false);
        props.GetAllCardDetails(props.PageNumber);
      });
  };

  return (
    <div className="GetProduct-Container">
      <div className="GetProduct-SubContainer">
        {Array.isArray(props.List) && props.List.length > 0
          ? props.List.map(function (data, index) {
              // console.log("Data : ", data);
              return (
                <Card
                  className=""
                  style={{ maxWidth: 350, margin: 15 }}
                  key={index}
                >
                  <CardActionArea>
                    <CardMedia
                      //   className=""
                      style={{ height: 180, width: 260 }}
                      image={data.productImageUrl}
                      title="Contemplative Reptile"
                    />

                    <CardContent
                      style={{
                        width: 228,
                        height: 130,
                      }}
                    >
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        // style={{ margin: 0 }}
                      >
                        {data.productName}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        style={{
                          height: 80,
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          // display: "flex",
                          // justifyContent: "center",
                          // alignItems: "center",
                        }}
                      >
                        {data.productDetails}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        style={{
                          height: 40,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontWeight: 600,
                          color: "blue",
                        }}
                      >
                        {props.State === "Home" ||
                        props.State === "Archive" ||
                        props.State === "UserHome" ||
                        props.State === "Trash" ||
                        props.State === "WishList" ? (
                          <>
                            {data.quantity !== 0 ? (
                              <>Available : {data.quantity}</>
                            ) : (
                              <>Not Available</>
                            )}
                          </>
                        ) : null}{" "}
                        &nbsp; &nbsp;{" "}
                        {props.State !== "MyOrder" ? (
                          <>Price : {data.productPrice} &#8377;</>
                        ) : null}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    {props.State === "Home" ? (
                      <>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => {
                            ProductMoveToArchive(data.productID);
                          }}
                        >
                          <ArchiveIcon style={{ color: "black" }} />
                        </Button>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => {
                            ProductMoveToTrash(data.productID);
                          }}
                        >
                          <DeleteIcon style={{ color: "black" }} />
                        </Button>
                      </>
                    ) : props.State === "Archive" ? (
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                          ProductRestore(data.productID);
                        }}
                      >
                        <RestoreIcon style={{ color: "black" }} />
                      </Button>
                    ) : props.State === "UserHome" ? (
                      <>
                        {data.quantity !== 0 ? (
                          <Button
                            size="small"
                            color="primary"
                            // variant="outlined"
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              color: "black",
                            }}
                            onClick={() => {
                              AddToCart(data.productID);
                            }}
                          >
                            {/* <AddShoppingCartIcon /> */}
                            &nbsp;Add To Cart
                          </Button>
                        ) : (
                          <></>
                        )}
                        <Button
                          size="small"
                          color="primary"
                          // variant="outlined"
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: "red",
                          }}
                          onClick={() => {
                            AddToWishList(data.productID);
                          }}
                        >
                          {/* <TurnedInNotIcon /> */}
                          &nbsp;Add To WishList
                        </Button>
                      </>
                    ) : props.State === "Trash" ? (
                      <>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => {
                            ProductRestore(data.productID);
                          }}
                        >
                          <RestoreIcon style={{ color: "black" }} />
                        </Button>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => {
                            ProductDeletePermenently(data.productID);
                          }}
                        >
                          <DeleteForeverIcon style={{ color: "black" }} />
                        </Button>
                      </>
                    ) : props.State === "Cart" ? (
                      <>
                        {data.quantity !== 0 ? (
                          <Button
                            size="small"
                            color="primary"
                            // variant="outlined"
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              color: "black",
                            }}
                            onClick={() => {
                              OrderProduct(data.cartID, data.productID);
                            }}
                          >
                            {/* <AddShoppingCartIcon /> */}
                            &nbsp;Order Product
                          </Button>
                        ) : (
                          <></>
                        )}
                        <Button
                          size="small"
                          color="primary"
                          // variant="outlined"
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: "red",
                          }}
                          onClick={() => {
                            RemoveCart(data.cartID);
                          }}
                        >
                          {/* <TurnedInNotIcon /> */}
                          &nbsp;Remove Cart
                        </Button>
                      </>
                    ) : props.State === "WishList" ? (
                      <>
                        {data.quantity !== 0 ? (
                          <Button
                            size="small"
                            color="primary"
                            onClick={() => {
                              MoveToCart(data.productID, data.wishListID);
                            }}
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              color: "black",
                            }}
                          >
                            Move To Cart
                          </Button>
                        ) : (
                          <></>
                        )}
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => {
                            RemoveWishList(data.wishListID);
                          }}
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: "red",
                          }}
                        >
                          Remove WishList
                        </Button>
                      </>
                    ) : props.State === "MyOrder" ? (
                      <>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => {
                            CancleOrder(data.cartID, data.productID);
                          }}
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: "red",
                          }}
                        >
                          Cancle Order
                        </Button>
                      </>
                    ) : null}
                  </CardActions>
                </Card>
              );
            })
          : null}
      </div>
      <Pagination
        count={props.TotalPages}
        Page={props.PageNumber}
        onChange={props.handlePaging}
        variant="outlined"
        shape="rounded"
        color="secondary"
      />
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
