import BaseService from "../../../@Core/api/BaseService";

class Class extends BaseService {
  BASE_ENDPOINT = "/api/v1/classes";

  constructor(params) {
    super(params);
    this.setRequest();
  }
}

export const classService = new Class();
