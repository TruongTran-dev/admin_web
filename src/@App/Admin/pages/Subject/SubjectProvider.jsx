import { useRequest } from "ahooks";
import React, { useEffect } from "react";
import { subjectService } from "../../services/subjectService";
import AdminPageProvider from "../../components/Provider/AdminPageProvider";
import useCoreTable from "../../../../@Core/components/Table/hooks/useCoreTable";
import { errorMsg, successMsg } from "../../../../@Core/helper/Message";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Yup from "../../../../@Core/helper/Yup";
// import PropTypes from 'prop-types'

const SubjectProvider = (props) => {
  const requestSubjects = useRequest(subjectService.list, {
    manual: true,
    onError: () => errorMsg("Lấy danh sách môn học thất bại"),
  });

  const methodForm = useForm({
    mode: "onTouched",
    defaultValues: {
      id: null,
      name: "",
    },
    resolver: yupResolver(
      Yup.object({
        name: Yup.string().trim().required().min(3).max(255),
      })
    ),
  });

  const tableHandler = useCoreTable(requestSubjects);

  const handleDelete = async (id) => {
    try {
      await subjectService.delete(id);
      successMsg("Xóa môn học thành công");
      tableHandler.handleFetchData();
    } catch (error) {
      errorMsg("Xóa môn học thất bại");
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

export default React.memo(SubjectProvider);
