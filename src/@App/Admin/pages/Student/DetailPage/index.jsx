import React from "react";
import AdminContentPage from "../../../components/Layout/AdminContentPage";
import { useStudentDetail } from "./hooks/useStudentDetail";
import { Box, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StudentForm from "./StudentForm";

const DetailPage = (props) => {
  const { isEdit, student, loadingStudent } = useStudentDetail();
  const navigate = useNavigate();
  return loadingStudent ? (
    <Box className="mt-40 text-center">
      <CircularProgress />
    </Box>
  ) : (
    <AdminContentPage
      pageTitle={isEdit ? "Chỉnh sửa học sinh" : "Thêm mới học sinh"}
      headerAction={
        <Button
          variant="contained"
          color="error"
          onClick={() => navigate("/teacher/student")}
        >
          Trở lại
        </Button>
      }
      content={<StudentForm isEdit={isEdit} student={student} />}
    />
  );
};

export default React.memo(DetailPage);
