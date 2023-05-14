import { useRequest, useUpdateEffect } from "ahooks";
import { useParams } from "react-router-dom";
import { studentService } from "../../../../services/studentService";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const useLearningResultDetail = (props) => {
  const { id, year } = useParams();

  const { control, watch } = useForm({
    defaultValues: {
      time: {
        label: `Học kì 1 ${year}`,
        time: {
          year: year,
          term: 1,
        },
        value: `Học kì 1 ${year}`,
      },
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

  useEffect(() => {
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
