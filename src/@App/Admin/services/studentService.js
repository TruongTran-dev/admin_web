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

  editLearningResult = (data) => {
    console.log("============= data", data);
    const endpoint = `/api/v1/learning-result/${data?.id}`;
    return this.request.put(endpoint, data);
  };
}

export const studentService = new Student();
