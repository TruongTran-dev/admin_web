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
import { useUserForm } from "./hooks/useUserForm";
import CoreInput from "../../../../../@Core/components/Input/CoreInput";
import { LoadingButton } from "@mui/lab";
import CoreAutocomplete from "../../../../../@Core/components/Input/CoreAutocomplete";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const UserForm = (props) => {
  const { isEdit } = props;
  const [viewPassword, setViewPassword] = useState(false);
  const [viewPasswordConfirm, setViewPasswordConfirm] = useState(false);
  const { methodForm, onSubmit } = useUserForm(props);
  const {
    control,
    formState: { isDirty, isSubmitting },
  } = methodForm;

  return (
    <FormProvider>
      <form onSubmit={onSubmit} className="py-20">
        <Box className="flex flex-wrap">
          <CoreAutocomplete
            label="Quyền"
            control={control}
            name="roles"
            placeholder="Chọn quyền"
            className="w-full px-8 mb-20 sm:w-1/2"
            options={[
              { value: "ROLE_ADMIN", label: "Admin" },
              { value: "ROLE_TEACHER", label: "Giáo viên" },
              { value: "ROLE_PARENTS", label: "Phụ huynh" },
            ]}
            multiple
            returnValueType="enum"
            required
          />
          <CoreInput
            label="Username"
            control={control}
            name="username"
            placeholder="Nhập username"
            className="w-full px-8 mb-20 sm:w-1/2"
            required
          />

          {!isEdit && (
            <>
              <CoreInput
                label="Mật khẩu"
                control={control}
                name="password"
                placeholder="Nhập mật khẩu"
                className="w-full px-8 mb-20 sm:w-1/2"
                required
                type={viewPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {viewPassword ? (
                        <IconButton onClick={() => setViewPassword(false)}>
                          <VisibilityOutlinedIcon />
                        </IconButton>
                      ) : (
                        <IconButton onClick={() => setViewPassword(true)}>
                          <VisibilityOffOutlinedIcon />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
              <CoreInput
                label="Xác nhận mật khẩu"
                control={control}
                name="confirmPassword"
                placeholder="Nhập mật khẩu"
                className="w-full px-8 mb-20 sm:w-1/2"
                required
                type={viewPasswordConfirm ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {viewPasswordConfirm ? (
                        <IconButton
                          onClick={() => setViewPasswordConfirm(false)}
                        >
                          <VisibilityOutlinedIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() => setViewPasswordConfirm(true)}
                        >
                          <VisibilityOffOutlinedIcon />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}

          <CoreInput
            label="Email"
            control={control}
            name="email"
            placeholder="Nhập email"
            className="w-full px-8 mb-20 sm:w-1/2"
            required
          />
          <CoreInput
            label="Tên đầy đủ"
            control={control}
            name="fullName"
            placeholder="Nhập tên đầy đủ"
            className="w-full px-8 mb-20 sm:w-1/2"
            required
          />
          <CoreInput
            label="Số điện thoại"
            control={control}
            name="phone"
            placeholder="Nhập số điện thoại"
            className="w-full px-8 mb-20 sm:w-1/2"
            required
          />
        </Box>
        <Box className="text-center">
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={isSubmitting}
            disabled={!isDirty}
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
