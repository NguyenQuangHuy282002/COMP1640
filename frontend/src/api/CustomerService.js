import { Http } from "./http.js";

const API_ENDPOINT = {
  CREATE_Customer: "/customer/customer/create",
  LIST_Customer: "/customer/customer/list",
  GET_Customer: "/customer/customer/get",
  UPDATE_Customer: "/customer/customer/update",
  DELETE_Customer: "/customer/customer/delete",
};
class CustomerService {
  constructor() {
    if (CustomerService._instance) {
      return CustomerService._instance;
    }
    CustomerService._instance = this;
  }
  getList() {
    return Http.get(API_ENDPOINT.LIST_Customer);
  }
  get(id) {
    return Http.get(API_ENDPOINT.GET_Customer + `?id=${id}`);
  }
  create(payload) {
    return Http.post(API_ENDPOINT.CREATE_Customer, payload);
  }

  update(id, data) {
    return Http.post(API_ENDPOINT.UPDATE_Customer + `?id=${id}`, data);
  }

  delete(id) {
    return Http.post(API_ENDPOINT.DELETE_Customer + `?id=${id}`);
  }
}

const Service = new CustomerService();

export default Service;
