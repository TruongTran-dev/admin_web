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
import { errorMsg, successMsg } from "../../../../../@Core/helper/Message";
// import PropTypes from 'prop-types'

const UserProvider = (props) => {
  const requestUsers = useRequest(userSerivce.list, {
    manual: true,
    onError: () => errorMsg("Lấy danh sách user thất bại"),
  });

  const tableHandler = useCoreTable(requestUsers);

  const handleDelete = async (id) => {
    try {
      await userSerivce.delete(id);
      successMsg("Xóa user thành công");
      tableHandler.handleFetchData();
    } catch (error) {
      errorMsg("Xóa user thất bại");
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

export default React.memo(UserProvider);
