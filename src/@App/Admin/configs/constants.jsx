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
  subjects: {
    list: basePath + "/subject",
  },
};

export const ROUTER_TEACHER = {
  news: {
    list: "/teacher/news",
    edit: "/teacher/news/:id",
  },
  student: {
    list: "/teacher/student",
    edit: "/teacher/student/:id",
  },
  classes: {
    list: "/teacher/classes",
    edit: "/teacher/classes/:id",
  },
  learningResult: "/teacher/learning-result/:id",
};
