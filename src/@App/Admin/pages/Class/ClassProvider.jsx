import { useRequest } from "ahooks";
import React, { useEffect } from "react";
import AdminPageProvider from "../../components/Provider/AdminPageProvider";
import useCoreTable from "../../../../@Core/components/Table/hooks/useCoreTable";
import { errorMsg, successMsg } from "../../../../@Core/helper/Message";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Yup from "../../../../@Core/helper/Yup";
import { classService } from "../../services/classService";
// import PropTypes from 'prop-types'

const ClassProvider = (props) => {
  const requestClasses = useRequest(classService.list, {
    manual: true,
    onError: () => errorMsg("Lấy danh sách lớp học thất bại"),
  });

  const methodForm = useForm({
    mode: "onTouched",
    defaultValues: {
      id: null,
      name: "",
      subjectIds: [],
      year: null,
    },
    resolver: yupResolver(
      Yup.object({
        name: Yup.string().trim().required().max(255),
        subjectIds: Yup.array().min(1),
        year: Yup.mixed().nullable().required(),
      })
    ),
  });

  const tableHandler = useCoreTable(requestClasses);

  const handleDelete = async (id) => {
    try {
      await classService.delete(id);
      successMsg("Xóa lớp học thành công");
      tableHandler.handleFetchData();
    } catch (error) {
      errorMsg("Xóa lớp học thất bại");
    }
  };

  useEffect(() => {
    tableHandler.handleFetchData();
  }, []);

  const data = {
    tableHandler,
    handleDelete,
    methodForm,
    ...props,
  };

  return <AdminPageProvider {...data}>{props.children}</AdminPageProvider>;
};

export default React.memo(ClassProvider);
