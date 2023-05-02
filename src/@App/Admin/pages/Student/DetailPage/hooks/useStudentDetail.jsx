import { useRequest } from "ahooks";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { studentService } from "../../../../services/studentService";
// import PropTypes from 'prop-types'

export const useStudentDetail = (props) => {
  const { id } = useParams();

  const isEdit = id !== "new";

  const {
    data: student,
    run: getStudent,
    loading: loadingStudent,
  } = useRequest(studentService.getDetailStudent, {
    manual: true,
  });

  useEffect(() => {
    if (isEdit) {
      getStudent(id);
    }
  }, []);
  return {
    isEdit,
    student,
    loadingStudent,
  };
};
