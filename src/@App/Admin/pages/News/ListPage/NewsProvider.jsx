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
import AdminPageProvider from "../../../components/Provider/AdminPageProvider";
import useCoreTable from "../../../../../@Core/components/Table/hooks/useCoreTable";
import { errorMsg, successMsg } from "../../../../../@Core/helper/Message";
import { newsSerivce } from "../../../services/newsService";
// import PropTypes from 'prop-types'

const NewsProvider = (props) => {
  const requestNews = useRequest(newsSerivce.list, {
    manual: true,
    onError: () => errorMsg("Lấy danh sách bài viết thất bại"),
  });

  const tableHandler = useCoreTable(requestNews);

  const handleDelete = async (id) => {
    try {
      await newsSerivce.delete(id);
      successMsg("Xóa bài viết thành công");
      tableHandler.handleFetchData();
    } catch (error) {
      errorMsg("Xóa bài viết thất bại");
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

export default React.memo(NewsProvider);
