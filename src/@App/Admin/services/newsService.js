import BaseService from "../../../@Core/api/BaseService";

class News extends BaseService {
  BASE_ENDPOINT = "/api/v1/news";

  constructor(params) {
    super(params);
    this.setRequest();
  }

  getNewsDetail = (id) => {
    const endpoint = `/api/v1/news/detail/${id}`;
    return this.request.getNewsDetail(endpoint);
  };
}

export const newsSerivce = new News();
