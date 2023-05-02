import { useRequest, useUpdateEffect } from "ahooks";
import { useParams } from "react-router-dom";
import { studentService } from "../../../../services/studentService";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const useLearningResultDetail = (props) => {
  const { id } = useParams();

  const { control, watch } = useForm({
    defaultValues: {
      time: null,
    },
  });

  const time = watch("time");

  const {
    data: learningResult,
    run: getLearningResult,
    loading,
  } = useRequest(studentService.getLearningResult, {
    manual: true,
  });

  useUpdateEffect(() => {
    getLearningResult({ studentId: id, ...time?.time });
  }, [JSON.stringify(watch("time"))]);

  const {
    data: student,
    run: getStudent,
    loading: loadingStudent,
  } = useRequest(studentService.getDetailStudent, {
    manual: true,
  });

  useEffect(() => {
    getStudent(id);
  }, []);
  return {
    learningResult,
    loading,
    student,
    loadingStudent,
    control,
    time,
    getLearningResult,
  };
};
