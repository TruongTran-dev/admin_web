/*
 * Created Date: 16-08-2022, 2:14:11 am
 * Author: Peter
 * Email: phantrung696@gmail.com
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * Copyright (c) 2022 PT CORP, Inc
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 */

import Cookies from "js-cookie";

const excludeAuthenApi = [];
const authToken = async (requestConfig) => {
  let authToken = Cookies.get("ACCOUNT_INFO");

  const { url, notAuth } = requestConfig;
  if (excludeAuthenApi.includes(url) || notAuth) {
    return requestConfig;
  }

  if (authToken) {
    requestConfig.headers.Authorization = `${
      JSON.parse(authToken)?.accessToken
    }`;
  }

  return requestConfig;
};

export const globalApiMiddleware = {
  auth: authToken,
};
