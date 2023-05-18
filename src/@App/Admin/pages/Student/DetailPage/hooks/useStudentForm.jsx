/*
 * Created Date: 23-10-2022, 12:26:54 am
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

import { useForm } from "react-hook-form";
import { errorMsg, successMsg } from "../../../../../../@Core/helper/Message";
import { yupResolver } from "@hookform/resolvers/yup";
import Yup from "../../../../../../@Core/helper/Yup";
import { useNavigate } from "react-router-dom";
import { studentService } from "../../../../services/studentService";
import moment from "moment";
import dayjs from "dayjs";

export const useStudentForm = (props) => {
  const { student, isEdit } = props;

  const navigate = useNavigate();
  const methodForm = useForm({
    mode: "onTouched",
    defaultValues: {
      id: student?.id ?? "",
      name: student?.name ?? "",
      imageUrl: student?.imageUrl ?? "",
      classId: student?.classResponse?.id ?? null,
      dateOfBirth: student?.dateOfBirth ? dayjs(student?.dateOfBirth) : null,
      semesterYear: null,
    },
    resolver: yupResolver(
      Yup.object({
        name: Yup.string().trim().required().min(3).max(255),
        imageUrl: Yup.string().trim().required(),
        classId: Yup.mixed().nullable().required(),
        dateOfBirth: Yup.mixed().nullable().required(),
        semesterYear: Yup.mixed().when("name", {
          is: (val) => !isEdit,
          then: Yup.mixed().nullable().required(),
        }),
      })
    ),
  });

  const onSubmit = methodForm.handleSubmit(
    async (data) => {
      data.dateOfBirth = moment(new Date(data?.dateOfBirth), "DD-MM-YYYY").add(
        7,
        "hours"
      );
      try {
        await studentService.save(data);
        navigate("/teacher/student");
        successMsg(
          isEdit
            ? "Cập nhật học sinh thành công"
            : "Thêm mới học sinh thành công"
        );
      } catch (e) {
        errorMsg(
          e,
          isEdit ? "Cập nhật học sinh thất bại" : "Thêm mới học sinh thất bại"
        );
      }
    },
    (error) => console.log("============= error", error)
  );

  return { methodForm, onSubmit };
};
