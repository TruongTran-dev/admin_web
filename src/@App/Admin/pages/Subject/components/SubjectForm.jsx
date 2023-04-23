import React from "react";
import { useAdminPageContext } from "../../../components/Provider/AdminPageProvider";
import CoreInput from "../../../../../@Core/components/Input/CoreInput";
import { LoadingButton } from "@mui/lab";
import { subjectService } from "../../../services/subjectService";
import { errorMsg, successMsg } from "../../../../../@Core/helper/Message";
import { Box, Button, CardContent, CardHeader } from "@mui/material";
// import PropTypes from 'prop-types'

const SubjectForm = (props) => {
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
      await subjectService.save(data);
      reset();
      tableHandler.handleFetchData();
      successMsg(
        id ? "Chỉnh sửa môn học thành công" : "Thêm mới môn học thành công"
      );
    } catch (error) {
      errorMsg(id ? "Chỉnh sửa môn học thất bại" : "Thêm mới môn học thất bại");
    }
  });
  return (
    <>
      <CardHeader title={id ? "Chỉnh sửa môn học" : "Thêm mới môn học"} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <CoreInput
            control={control}
            name="name"
            label="Tên môn học"
            placeholder="Nhập tên môn học"
            className="mb-20"
            required
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

// SubjectForm.defaultProps = {}

// SubjectForm.propTypes = {}

export default React.memo(SubjectForm);
