import BaseService from "../../../@Core/api/BaseService";

class Category extends BaseService {
  BASE_ENDPOINT = "/api/v1/category";

  constructor(params) {
    super(params);
    this.setRequest();
  }

  getAllCategory = (params) => {
    const endpoint = "/api/v1/category/all";
    return this.request.get(endpoint, { params });
  };
}

export const categorySerivce = new Category();
