import { Http } from "./http.js";

const API_ENDPOINT = {
  CREATE_COMMENT: "/product/comment/create",
  GET_COMMENT: "/product/comment/list",
};
class CommentService {
  constructor() {
    if (CommentService._instance) {
      return CommentService._instance;
    }
    CommentService._instance = this;
  }

  get(id) {
    return Http.get(API_ENDPOINT.GET_COMMENT + `?product_id=${id}`);
  }
  create(payload) {
    return Http.post(API_ENDPOINT.CREATE_COMMENT, payload);
  }
}

const Service = new CommentService();

export default Service;
