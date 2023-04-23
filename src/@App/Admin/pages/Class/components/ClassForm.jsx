import React from "react";
import { useAdminPageContext } from "../../../components/Provider/AdminPageProvider";
import CoreInput from "../../../../../@Core/components/Input/CoreInput";
import { LoadingButton } from "@mui/lab";
import { subjectService } from "../../../services/subjectService";
import { errorMsg, successMsg } from "../../../../../@Core/helper/Message";
import { Box, Button, CardContent, CardHeader } from "@mui/material";
import { classService } from "../../../services/classService";
import SelectSubject from "./SelectSubject";
import CoreAutocomplete from "../../../../../@Core/components/Input/CoreAutocomplete";
// import PropTypes from 'prop-types'

const ClassForm = (props) => {
  const { methodForm, tableHandler } = useAdminPageContext();
  const {
    watch,
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methodForm;
  const id = watch("id");

  const onSubmit = handleSubmit(async (data) => {
    try {
      await classService.save(data);
      reset();
      tableHandler.handleFetchData();
      successMsg(
        id ? "Chỉnh sửa lớp học thành công" : "Thêm mới lớp học thành công"
      );
    } catch (error) {
      errorMsg(id ? "Chỉnh sửa lớp học thất bại" : "Thêm mới lớp học thất bại");
    }
  });
  return (
    <>
      <CardHeader title={id ? "Chỉnh sửa lớp học" : "Thêm mới lớp học"} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <CoreInput
            control={control}
            name="name"
            label="Tên lớp học"
            placeholder="Nhập tên lớp học"
            className="mb-20"
            required
          />

          <SelectSubject
            control={control}
            name="subjectIds"
            label="Môn học"
            className="mb-20"
            multiple
            required
            returnValueType="enum"
          />

          <CoreAutocomplete
            control={control}
            name="year"
            label="Năm học"
            required
            options={[
              { value: "2023-2024", label: "2023-2024" },
              { value: "2024-2025", label: "2024-2025" },
            ]}
            className="mb-20"
            returnValueType="enum"
          />

          <Box className="text-right">
            <Button
              variant="contained"
              className="mr-12"
              color="error"
              onClick={reset}
            >
              Reset
            </Button>
            <LoadingButton
              type="submit"
              loading={isSubmitting}
              variant="contained"
              color="primary"
            >
              {id ? "Chỉnh sửa" : "Thêm mới"}
            </LoadingButton>
          </Box>
        </form>
      </CardContent>
    </>
  );
};

// ClassForm.defaultProps = {}

// ClassForm.propTypes = {}

export default React.memo(ClassForm);
