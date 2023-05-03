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
import { studentService } from "../../../services/studentService";
// import PropTypes from 'prop-types'

const StudentProvider = (props) => {
  const requestStudents = useRequest(studentService.list, {
    manual: true,
    onError: () => errorMsg("Lấy danh sách học sinh thất bại"),
  });

  const tableHandler = useCoreTable(requestStudents);

  const handleDelete = async (id) => {
    try {
      await studentService.delete(id);
      successMsg("Xóa học sinh thành công");
      tableHandler.handleFetchData();
    } catch (error) {
      errorMsg("Xóa học sinh thất bại");
    }
  };

  const data = {
    tableHandler,
    handleDelete,
    ...props,
  };

  return <AdminPageProvider {...data}>{props.children}</AdminPageProvider>;
};

export default React.memo(StudentProvider);
