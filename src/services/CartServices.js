import AxiosServices from "./AxiosServices";
import CartConfiguration from "../configurations/CartConfiguration";

const axiosServices = new AxiosServices();

export default class CartServices {
  AddToCard(data) {
    return axiosServices.post(CartConfiguration.AddToCard, data, false);
  }

  GetAllCardDetails(data) {
    return axiosServices.post(CartConfiguration.AddToCard, data, false);
  }

  RemoveCartProduct(data) {
    return axiosServices.Delete(CartConfiguration.AddToCard, data, false);
  }

  OrderProduct(data) {
    return axiosServices.post(CartConfiguration.AddToCard, data, false);
  }
}
