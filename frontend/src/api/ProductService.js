import { Http } from "./http.js";

const API_ENDPOINT = {
  CREATE_PRODUCT: "/product/product/create",
  LIST_PRODUCT: "/product/product/list",
  GET_PRODUCT: "/product/product/get",
  GETBYNAME_PRODUCT: "/product/product/get_by_name",
  UPDATE_PRODUCT: "/product/product/update",
  DELETE_PRODUCT: "/product/product/delete",
  SALE_PRODUCT: "/product/product/sale",
};
class ProductService {
  constructor() {
    if (ProductService._instance) {
      return ProductService._instance;
    }
    ProductService._instance = this;
  }
  getList() {
    return Http.get(API_ENDPOINT.LIST_PRODUCT);
  }
  getListSale() {
    return Http.get(API_ENDPOINT.SALE_PRODUCT);
  }
  get(id) {
    return Http.get(API_ENDPOINT.GET_PRODUCT + `?id=${id}`);
  }
  getByName(name) {
    return Http.get(API_ENDPOINT.GETBYNAME_PRODUCT + `?name=${name}`);
  }
  create(payload) {
    return Http.post(API_ENDPOINT.CREATE_PRODUCT, payload);
  }

  update(id, data) {
    return Http.post(API_ENDPOINT.UPDATE_PRODUCT + `?id=${id}`, data);
  }

  delete(id) {
    return Http.post(API_ENDPOINT.DELETE_PRODUCT + `?id=${id}`);
  }
}

const Service = new ProductService();

export default Service;
