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
import { categorySerivce } from "../../../../services/categoryService";

export const useCategoryForm = (props) => {
  const { category, isEdit } = props;

  const navigate = useNavigate();
  const methodForm = useForm({
    mode: "onTouched",
    defaultValues: {
      id: category?.id ?? "",
      name: category?.name ?? "",
      description: category?.description ?? "",
      categoryType: category?.categoryType ?? null,
      parentId: category?.parentId ?? 0,
      logoImageID: category?.logoImageID ?? null,
      logoImage: category?.logoImage ?? null,
    },
    resolver: yupResolver(
      Yup.object({
        name: Yup.string().trim().required().min(3),
        // description: Yup.string().trim().required().min(3),
        categoryType: Yup.mixed().nullable().required(),
        logoImage: Yup.mixed().nullable().required(),
      })
    ),
  });

  const onSubmit = methodForm.handleSubmit(
    async (data) => {
      data.logoImageID = data.logoImage?.id;
      try {
        await categorySerivce.save(data);
        navigate("/admin/category");
        successMsg(
          isEdit
            ? "Cập nhật danh mục chi tiêu thành công"
            : "Thêm mới danh mục chi tiêu thành công"
        );
      } catch (e) {
        errorMsg(
          e,
          isEdit
            ? "Cập nhật danh mục chi tiêu thất bại"
            : "Thêm mới danh mục chi tiêu thất bại"
        );
      }
    },
    (error) => console.log("============= error", error)
  );

  return { methodForm, onSubmit };
};
