import BaseService from "../../../@Core/api/BaseService";

class Auth extends BaseService {
  BASE_ENDPOINT = "/api/resource/login";

  constructor(params) {
    super(params);
    this.setRequest();
    // this.createFactory(eventFactory)
    // this.setMockAdapter()
  }

  csrf = (params) => {
    const endpoint = "/api/resource/sanctum/csrf-cookie";
    return this.request.get(endpoint, { params });
  };

  login = (data) => {
    const endpoint = "/api/auth/sign-in";
    return this.request.post(endpoint, data);
  };

  logout = (data) => {
    const endpoint = "/api/resource/logout";
    return this.request.post(endpoint);
  };
}

export const authService = new Auth();
