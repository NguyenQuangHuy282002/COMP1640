import { Http } from "./http.js";

const API_ENDPOINT = {
  CREATE_ORDER: "/order/order/create",
  LIST_ORDER: "/order/order/list",
  GET_ORDER: "/order/order/get",
  UPDATE_ORDER: "/order/order/update",
  DELETE_ORDER: "/order/order/delete",
};
class OrderService {
  constructor() {
    if (OrderService._instance) {
      return OrderService._instance;
    }
    OrderService._instance = this;
  }
  getList() {
    return Http.get(API_ENDPOINT.LIST_ORDER);
  }
  get(id) {
    return Http.get(API_ENDPOINT.GET_ORDER + `?id=${id}`);
  }
  create(payload) {
    return Http.post(API_ENDPOINT.CREATE_ORDER, payload);
  }

  update(id, data) {
    return Http.post(API_ENDPOINT.UPDATE_ORDER + `?id=${id}`, data);
  }

  delete(id) {
    return Http.post(API_ENDPOINT.DELETE_ORDER + `?id=${id}`);
  }
}

const Service = new OrderService();

export default Service;
