import { ROUTER_ADMIN, ROUTER_TEACHER } from "./constants";
import React from "react";
/*
 * Created Date: 11-10-2022, 12:22:10 am
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

const LazyHomePage = React.lazy(() => import("../pages/HomePage"));
const LazyUserList = React.lazy(() => import("../pages/Users/ListPage"));
const LazyUserDetail = React.lazy(() => import("../pages/Users/DetailPage"));

const LazyNewsList = React.lazy(() => import("../pages/News/ListPage"));
const LazyNewsDetail = React.lazy(() => import("../pages/News/DetailPage"));

const LazyStudentList = React.lazy(() => import("../pages/Student/ListPage"));
const LazyStudentDetail = React.lazy(() =>
  import("../pages/Student/DetailPage")
);

const LazySubjectList = React.lazy(() => import("../pages/Subject"));

const LazyLearningResult = React.lazy(() =>
  import("../pages/Student/LearningResult")
);
const LazyClassList = React.lazy(() => import("../pages/Class"));

// auth
const LazyLogin = React.lazy(() => import("../pages/Auth/Login"));

export const routerAuthConfig = [
  {
    path: ROUTER_ADMIN.auth.login,
    element: <LazyLogin />,
  },
];

export const routerAdminConfig = [
  {
    path: ROUTER_ADMIN.homePage,
    element: <LazyHomePage />,
  },
  {
    path: ROUTER_ADMIN.user.list,
    element: <LazyUserList />,
  },
  {
    path: ROUTER_ADMIN.user.edit,
    element: <LazyUserDetail />,
  },
  {
    path: ROUTER_ADMIN.subjects.list,
    element: <LazySubjectList />,
  },
];

export const routerTeacherConfig = [
  {
    path: ROUTER_TEACHER.news.edit,
    element: <LazyNewsDetail />,
  },
  {
    path: ROUTER_TEACHER.news.list,
    element: <LazyNewsList />,
  },
  {
    path: ROUTER_TEACHER.student.edit,
    element: <LazyStudentDetail />,
  },
  {
    path: ROUTER_TEACHER.student.list,
    element: <LazyStudentList />,
  },
  {
    path: ROUTER_TEACHER.classes.list,
    element: <LazyClassList />,
  },
  {
    path: ROUTER_TEACHER.learningResult,
    element: <LazyLearningResult />,
  },
];
