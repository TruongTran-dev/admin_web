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
import React from "react";
import { FormProvider } from "react-hook-form";
import { useUserForm } from "./hooks/useUserForm";
import CoreInput from "../../../../../@Core/components/Input/CoreInput";
import { LoadingButton } from "@mui/lab";
import CoreAutocomplete from "../../../../../@Core/components/Input/CoreAutocomplete";

const UserForm = (props) => {
  const { isEdit } = props;
  const { methodForm, onSubmit } = useUserForm(props);
  const {
    control,
    formState: { isDirty, isSubmitting },
  } = methodForm;

  return (
    <FormProvider>
      <form onSubmit={onSubmit}>
        <Box className="flex flex-wrap">
          <CoreInput
            label="Username"
            control={control}
            name="username"
            placeholder="Nhập username"
            className="w-full px-8 mb-12 sm:w-1/2"
            required
          />

          {!isEdit && (
            <CoreInput
              label="Mật khẩu"
              control={control}
              name="password"
              placeholder="Nhập mật khẩu"
              className="w-full px-8 mb-12 sm:w-1/2"
              required
              type="password"
            />
          )}

          <CoreAutocomplete
            label="Quyền"
            control={control}
            name="roles"
            placeholder="Chọn quyền"
            className="w-full px-8 mb-12 sm:w-1/2"
            options={[
              { value: "ROLE_ADMIN", label: "Quyền Admin" },
              { value: "ROLE_USER", label: "Quyền User" },
            ]}
            multiple
            returnValueType="enum"
            required
          />

          <CoreInput
            label="Email"
            control={control}
            name="email"
            placeholder="Nhập email"
            className="w-full px-8 mb-12 sm:w-1/2"
            required
          />
          <CoreInput
            label="Tên đầy đủ"
            control={control}
            name="fullName"
            placeholder="Nhập tên đầy đủ"
            className="w-full px-8 mb-12 sm:w-1/2"
            required
          />
          <CoreInput
            label="Số điện thoại"
            control={control}
            name="phone"
            placeholder="Nhập số điện thoại"
            className="w-full px-8 mb-12 sm:w-1/2"
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
