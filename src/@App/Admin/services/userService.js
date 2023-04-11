import BaseService from "../../../@Core/api/BaseService";

class User extends BaseService {
  BASE_ENDPOINT = "/api/admin/users";

  constructor(params) {
    super(params);
    this.setRequest();
  }

  addUser = (data) => {
    const endpoint = "/api/admin/users/sign-up";
    return this.request.post(endpoint, data);
  };

  getDetailUser = (id) => {
    const endpoint = `/api/admin/users/detail/${id}`;
    return this.request.get(endpoint);
  };
}

export const userSerivce = new User();
