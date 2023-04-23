import BaseService from "../../../@Core/api/BaseService";

class Student extends BaseService {
  BASE_ENDPOINT = "/api/v1/students";

  constructor(params) {
    super(params);
    this.setRequest();
  }
}

export const studentService = new Student();
