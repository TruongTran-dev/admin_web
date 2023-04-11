/*
 * Created Date: 12-10-2022, 3:17:29 pm
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

import { useRequest } from "ahooks";
import React, { useEffect } from "react";
import { userSerivce } from "../../../services/userService";
import AdminPageProvider from "../../../components/Provider/AdminPageProvider";
import useCoreTable from "../../../../../@Core/components/Table/hooks/useCoreTable";
import { categorySerivce } from "../../../services/categoryService";
import { errorMsg } from "../../../../../@Core/helper/Message";
// import PropTypes from 'prop-types'

const CategoryProvider = (props) => {
  const requestCategory = useRequest(categorySerivce.getAllCategory, {
    manual: true,
    onError: () => errorMsg("Lấy danh sách danh mục thu chi thất bại"),
  });

  const {
    data: category,
    run: getCategory,
    loading: loadingCategory,
  } = requestCategory;

  useEffect(() => {
    getCategory();
  }, []);

  const data = {
    category,
    loadingCategory,
    getCategory,
    ...props,
  };

  return <AdminPageProvider {...data}>{props.children}</AdminPageProvider>;
};

export default React.memo(CategoryProvider);
