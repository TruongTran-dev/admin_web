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
import { useStudentForm } from "./hooks/useStudentForm";
import CoreInput from "../../../../../@Core/components/Input/CoreInput";
import { LoadingButton } from "@mui/lab";
import UploadAvatar from "./components/UploadAvatar";
import SelectClass from "./components/SelectClass";
import CoreDatePicker from "../../../../../@Core/components/Input/CoreDatePicker";
import CoreAutocomplete from "../../../../../@Core/components/Input/CoreAutocomplete";

const StudentForm = (props) => {
  const { isEdit } = props;
  const { methodForm, onSubmit } = useStudentForm(props);
  const {
    control,
    watch,
    formState: { isDirty, isSubmitting },
  } = methodForm;

  console.log("============= watch()", watch());

  return (
    <FormProvider {...methodForm}>
      <form onSubmit={onSubmit} className="py-20">
        <Box className="flex flex-nowrap">
          <Box className="w-1/3 mr-20">
            <UploadAvatar name="imageUrl" />
          </Box>
          <Box className="w-2/3">
            <CoreInput
              control={control}
              name="name"
              label="Họ tên học sinh"
              placeholder="Nhập tên học sinh"
              required
              className="w-full px-12 mb-40"
            />
            <SelectClass
              control={control}
              name="classId"
              label="Lớp"
              returnValueType="enum"
              className="w-full px-12 mb-40"
              required
            />
            <CoreDatePicker
              control={control}
              name="dateOfBirth"
              className="w-full px-12 mb-40"
              required
              label="Ngày sinh"
              placeholder="Chọn ngày sinh"
            />
            {!isEdit && (
              <CoreAutocomplete
                control={control}
                name="semesterYear"
                label="Học kì"
                returnValueType="enum"
                required
                className="w-full px-12 mb-40"
                options={[
                  { value: "2022-2023", label: "2022-2023" },
                  { value: "2023-2024", label: "2023-2024" },
                  { value: "2024-2025", label: "2024-2025" },
                ]}
              />
            )}
          </Box>
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

export default React.memo(StudentForm);
