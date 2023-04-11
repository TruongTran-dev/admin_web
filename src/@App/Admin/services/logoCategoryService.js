import BaseService from "../../../@Core/api/BaseService";

class CategoryLogo extends BaseService {
  BASE_ENDPOINT = "/api/v1/category-logo";

  constructor(params) {
    super(params);
    this.setRequest();
  }

  uploadLogo = (file) => {
    const endpoint = this.BASE_ENDPOINT;
    const formData = new FormData();
    formData.append("files", file);
    return this.request.post(endpoint, formData);
  };
}

export const categoryLogoSerivce = new CategoryLogo();
