/* eslint-disable no-prototype-builtins */
/* eslint-disable camelcase */
// import { flatTreeArray } from '@Core/Helper/Array'

import { get } from "lodash";
import has from "lodash/has";
import { createInstance } from "./axios";

import BaseFactory from "./Factory";

import { globalApiMiddleware } from "./middleware";
import MockAdapterService from "./MockAdapterService";

export const DEFAULT_RESPONSE = {
  content: [],
  data: [],
  total: 0,
  page: 1,
  size: 10,
};
class BaseService {
  BASE_URL = "https://chatappserver-production-2f10.up.railway.app";

  BASE_ENDPOINT = "/api/v1";

  DEFAULT_RESPONSE = DEFAULT_RESPONSE;

  DEFAULT_PAGE = 1;

  DEFAULT_LIMIT = 10;

  DEFAULT_SORT = "updatedAt desc";

  ALL_ITEMS = 10000;

  APPLY_MIDDLEWARE = {
    ...globalApiMiddleware,
  };

  pimaryKey = "id";

  factory = {};

  fakeData = [];

  mockApi = {};

  allowTranslateFields = [];

  allowScoreCompany = false;

  constructor(props) {
    if (has(props, "BASE_URL")) {
      this.BASE_URL = props.BASE_URL;
    }

    if (has(props, "BASE_ENDPOINT")) {
      this.BASE_ENDPOINT = props.BASE_ENDPOINT;
    }

    if (has(props, "APPLY_MIDDLEWARE")) {
      this.APPLY_MIDDLEWARE = props.APPLY_MIDDLEWARE;
    }

    this.setRequest();
  }

  setRequest() {
    this.request = createInstance(this.BASE_URL, this.middleware);
    this.paramsGet = {
      page: this.DEFAULT_PAGE,
      size: this.DEFAULT_LIMIT,
      sort: this.DEFAULT_SORT,
      // sort : this.DEFAULT_SORT,
    };
  }

  /**
   * create mock adapter service with crud
   */
  setMockAdapter(isCrud = true) {
    this.mockApi = new MockAdapterService(this.request, {
      delayResponse: 1000,
      onNoMatch: "passthrough",
    });
    this.mockApi.setApiService(this);
    if (isCrud) {
      this.mockApi.mockCRUD();
    }
  }

  /**
   * Set a custom middleware
   * @param {string} name
   * @param {(request) => {}} callback
   */
  setApplyMiddleware = (name, callback) => {
    this.APPLY_MIDDLEWARE[name] = callback;
  };

  createFactory = (factory) => {
    if (factory instanceof BaseFactory) {
      this.factory = factory.createModel;
      this.fakeData = factory.getData();
    } else {
      this.factory = factory;
    }
  };

  makeFakeData = (...lens) => {
    const makeDataLevel = (depth = 0) => {
      const len = lens[depth];
      return Array.from(new Array(len)).map((d, index) => {
        return {
          ...this.factory(index),
          subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
        };
      });
    };
    this.fakeData = makeDataLevel();
    return this;
  };

  /**
   * Apply middleware request instance axios
   * @param {requestConfig : axios} requestConfig
   */
  middleware = (requestConfig) => {
    const arr = Object.values(this.APPLY_MIDDLEWARE).map((m) => {
      if (typeof m === "function") {
        return m(requestConfig);
      }
      return m;
    });
    return arr;
  };

  /**
   * Get all resource for paginate
   * @param {}
   * @returns
   */
  list = (query = {}, config = {}) => {
    const params = { ...this.paramsGet, ...query };
    return this.request
      .get(this.BASE_ENDPOINT, { params, ...config })
      .then(this.withTranslate);
  };

  // /**
  //  * Get all resource for paginate with options value and label
  //  * @param {}
  //  * @returns
  //  */
  // listWithOptions = (query = {}, config = {}) => {
  // 	const params = {
  // 		...this.paramsGet,
  // 		page: 1,
  // 		size: this.ALL_ITEMS,
  // 		is_active: true,
  // 		...query
  // 	}
  // 	return this.request.get(this.BASE_ENDPOINT, { params, ...config }).then(this.withOptions)
  // }

  /**
   * Get specific of resource
   * @param {int} id
   * @param {object} config
   * @returns
   */
  find = (id, config = {}) => {
    const api = `${this.BASE_ENDPOINT}/${id}`;
    return this.request.get(api, config);
  };

  /**
   * Store a newly created resource in storage.
   * @param {object} data
   * @param {object} config
   * @returns
   */
  create = (data = {}, config = {}) => {
    return this.request.post(this.BASE_ENDPOINT, data, config);
  };

  /**
   * Update the specified resource in storage.
   * @param {object} data
   * @param {object} config
   * @returns
   */
  update = (data = {}, config = {}) => {
    const { pimaryKey } = this;
    return this.request.put(
      `${this.BASE_ENDPOINT}/${data[pimaryKey]}`,
      data,
      config
    );
  };

  save = (data = {}, config = {}) => {
    const { pimaryKey } = this;
    if (data.hasOwnProperty(pimaryKey) && data[pimaryKey]) {
      return this.update(data, config);
    }
    return this.create(data, config);
  };

  /**
   * Remove the specified resource from storage.
   * @param {int} id
   * @param {object} config
   * @returns
   */
  delete = (id, config = {}) => {
    const api = `${this.BASE_ENDPOINT}/${id}`;
    return this.request.delete(api, config);
  };

  changeStatus = async (id, next_status) => {
    const endpoint = `${this.BASE_ENDPOINT}/${id}/status`;
    return this.request.patch(endpoint, { next_status });
  };
}
export default BaseService;
