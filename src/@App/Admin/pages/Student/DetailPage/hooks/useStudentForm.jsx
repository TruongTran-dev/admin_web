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

export const useStudentForm = (props) => {
  const { student, isEdit } = props;

  const navigate = useNavigate();
  const methodForm = useForm({
    mode: "onTouched",
    defaultValues: {
      id: student?.id ?? "",
      name: student?.name ?? "",
      imageUrl: student?.imageUrl ?? "",
      classId: student?.classId ?? null,
      dateOfBirth: student?.dateOfBirth ?? null,
      semesterYear: student?.semesterYear ?? null,
    },
    resolver: yupResolver(
      Yup.object({
        name: Yup.string().trim().required().min(3).max(255),
        imageUrl: Yup.string().trim().required(),
        classId: Yup.mixed().nullable().required(),
        dateOfBirth: Yup.mixed().nullable().required(),
        semesterYear: Yup.mixed().nullable().required(),
      })
    ),
  });

  const onSubmit = methodForm.handleSubmit(
    async (data) => {
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
