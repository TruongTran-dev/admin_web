import BaseService from "../../../@Core/api/BaseService";

class Student extends BaseService {
  BASE_ENDPOINT = "/api/v1/students";

  constructor(params) {
    super(params);
    this.setRequest();
  }

  getDetailStudent = (id) => {
    const endpoint = this.BASE_ENDPOINT + `/detail/${id}`;
    return this.request.get(endpoint);
  };
  getLearningResult = (params) => {
    const endpoint = "/api/v1/learning-result";
    return this.request.get(endpoint, { params });
  };
}

export const studentService = new Student();
