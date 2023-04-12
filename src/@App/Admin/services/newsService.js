import BaseService from "../../../@Core/api/BaseService";

class News extends BaseService {
  BASE_ENDPOINT = "/api/v1/news";

  constructor(params) {
    super(params);
    this.setRequest();
  }

  getNewsDetail = (id) => {
    const endpoint = `/api/v1/news/detail/${id}`;
    return this.request.get(endpoint);
  };

  uploadImage = (file) => {
    const endpoint = "/api/v1/news/upload";
    const formData = new FormData();
    formData.append("file", file);
    return this.request.post(endpoint, formData);
  };
}

export const newsSerivce = new News();
