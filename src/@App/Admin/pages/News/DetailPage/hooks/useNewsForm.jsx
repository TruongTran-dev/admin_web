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
      title: news?.title ?? "",
      content: news?.content ?? "",
      mediaUrl: news?.mediaUrl ?? "",
      typeMedia: news?.typeMedia ?? 0,
    },
    resolver: yupResolver(
      Yup.object({
        // title: Yup.string().trim().min(3).required(),
        // content: Yup.string().trim().min(3).required(),
        // mediaUrl: Yup.string().trim().required(),
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
