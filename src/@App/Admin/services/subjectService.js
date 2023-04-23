import BaseService from "../../../@Core/api/BaseService";

class Subject extends BaseService {
  BASE_ENDPOINT = "/api/v1/subjects";

  constructor(params) {
    super(params);
    this.setRequest();
  }
}

export const subjectService = new Subject();
