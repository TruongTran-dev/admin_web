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
import { newsSerivce } from "../../../../services/newsService";

export const useNewsForm = (props) => {
  const { news, isEdit } = props;

  const navigate = useNavigate();
  const methodForm = useForm({
    mode: "onTouched",
    defaultValues: {
      id: news?.id ?? "",
      email: news?.email ?? "",
      username: news?.username ?? "",
      password: news?.password ?? "",
      confirmPassword: news?.confirmPassword ?? "",
      fullName: news?.fullName ?? "",
      phone: news?.phone ?? "",
      role: news?.role?.map((item) => item?.name) ?? [],
    },
    resolver: yupResolver(
      Yup.object({
        email: Yup.string().required().email(),
        username: Yup.string().required(),
        password: Yup.mixed().when("id", {
          is: (val) => !val,
          then: Yup.string().required().min(6).max(40),
        }),
        confirmPassword: Yup.mixed().when("id", {
          is: (val) => !val,
          then: Yup.string()
            .trim()
            .min(6)
            .max(40)
            .oneOf(
              [Yup.ref("password"), null],
              "Xác nhận password không hợp lệ"
            ),
        }),
        fullName: Yup.string().required(),
        phone: Yup.string().required().phone(),
        role: Yup.array().min(1),
      })
    ),
  });

  const onSubmit = methodForm.handleSubmit(
    async (data) => {
      try {
        await newsSerivce.save(data);
        navigate("/teacher/news");
        successMsg(
          isEdit
            ? "Cập nhật bài viết thành công"
            : "Thêm mới bài viết thành công"
        );
      } catch (e) {
        errorMsg(
          e,
          isEdit ? "Cập nhật bài viết thất bại" : "Thêm mới bài viết thất bại"
        );
      }
    },
    (error) => console.log("============= error", error)
  );

  return { methodForm, onSubmit };
};
