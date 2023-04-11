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
import { userSerivce } from "../../../../services/userService";
import { useNavigate } from "react-router-dom";

export const useUserForm = (props) => {
  const { user, isEdit } = props;

  const navigate = useNavigate();
  const methodForm = useForm({
    mode: "onTouched",
    defaultValues: {
      id: user?.id ?? "",
      email: user?.email ?? "",
      username: user?.username ?? "",
      password: user?.password ?? "",
      id: user?.id ?? "",
      fullName: user?.fullName ?? "",
      phone: user?.phone ?? "",
      roles: user?.roles?.map((item) => item?.name) ?? [],
    },
    resolver: yupResolver(
      Yup.object({
        email: Yup.string().required().email(),
        username: Yup.string().required(),
        password: Yup.mixed().when("id", {
          is: (val) => !val,
          then: Yup.string().required().min(6).max(40),
        }),
        fullName: Yup.string().required(),
        phone: Yup.string().required().phone(),
        roles: Yup.array().min(1),
      })
    ),
  });

  const onSubmit = methodForm.handleSubmit(
    async (data) => {
      try {
        await (isEdit ? userSerivce.save(data) : userSerivce.addUser(data));
        navigate("/admin/user");
        successMsg(
          isEdit
            ? "Cập nhật tài khoản thành công"
            : "Thêm mới tài khoản thành công"
        );
      } catch (e) {
        errorMsg(
          e,
          isEdit ? "Cập nhật tài khoản thất bại" : "Thêm mới tài khoản thất bại"
        );
      }
    },
    (error) => console.log("============= error", error)
  );

  return { methodForm, onSubmit };
};
