/*
 * Created Date: 11-10-2022, 12:21:48 am
 * Author: Peter
 * Email: phantrung696@gmail.com
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * Copyright (c) 2022 PROS+ Group , Inc
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 */

const basePath = "/admin";

export const ROUTER_ADMIN = {
  auth: {
    login: basePath + "/login",
  },

  homePage: basePath + "/home-page",
  user: {
    list: basePath + "/user",
    edit: basePath + "/user/:id",
  },
  category: {
    list: basePath + "/category",
    edit: basePath + "/category/:id",
  },
  categoryLogo: {
    list: basePath + "/category-logo",
  },
};
