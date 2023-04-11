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
import { categoryLogoSerivce } from "../../services/logoCategoryService";
import AdminPageProvider from "../../components/Provider/AdminPageProvider";
import { errorMsg, successMsg } from "../../../../@Core/helper/Message";
import useCoreTable from "../../../../@Core/components/Table/hooks/useCoreTable";
// import PropTypes from 'prop-types'

const CategoryLogoProvider = (props) => {
  const requestLogoCategory = useRequest(categoryLogoSerivce.list, {
    manual: true,
    onError: () => errorMsg("Lấy danh sách logo danh mục thu chi thất bại"),
  });

  const tableHandler = useCoreTable(requestLogoCategory);

  const handleDelete = async (id) => {
    try {
      await categoryLogoSerivce.delete(id);
      successMsg("Xóa logo thành công");
      tableHandler.handleFetchData();
    } catch (error) {
      errorMsg("Xóa logo thất bại");
    }
  };

  useEffect(() => {
    tableHandler.handleFetchData();
  }, []);

  const data = {
    tableHandler,
    handleDelete,
    ...props,
  };

  return <AdminPageProvider {...data}>{props.children}</AdminPageProvider>;
};

export default React.memo(CategoryLogoProvider);
