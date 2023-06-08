/*
 * Created Date: 12-10-2022, 3:36:47 pm
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

import { Box } from "@mui/system";
import React, { useState } from "react";
import { FormProvider } from "react-hook-form";
import { useNewsForm } from "./hooks/useNewsForm";
import CoreInput from "../../../../../@Core/components/Input/CoreInput";
import { LoadingButton } from "@mui/lab";
import CoreAutocomplete from "../../../../../@Core/components/Input/CoreAutocomplete";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import UploadImage from "./components/UploadImage";

const UserForm = (props) => {
  const { isEdit } = props;
  const { methodForm, onSubmit } = useNewsForm(props);
  const {
    control,
    watch,
    formState: { isDirty, isSubmitting },
  } = methodForm;

  console.log("============= watch", watch());

  return (
    <FormProvider {...methodForm}>
      <form onSubmit={onSubmit} className="py-20">
        <Box className="flex flex-nowrap">
          <Box className="w-1/3 mr-20">
            <UploadImage name="mediaUrl" nameType="typeMedia" />
          </Box>
          <Box className="w-2/3">
            <CoreInput
              control={control}
              name="title"
              label="Tiêu đề bài viết"
              placeholder="Nhập tiêu đề bài viết"
              required
              className="w-full px-12 mb-40"
            />
            <CoreInput
              control={control}
              name="content"
              label="Nội dung bài viết"
              placeholder="Nhập nội dung bài viết"
              required
              minRows={5}
              multiline
              className="w-full px-12 mb-20"
            />
          </Box>
        </Box>
        <Box className="text-center">
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={isSubmitting}
          >
            Xác nhận
          </LoadingButton>
        </Box>
      </form>
    </FormProvider>
  );
};

//ListSpotTable.defaultProps = {}

//ListSpotTable.propTypes = {}

export default React.memo(UserForm);
