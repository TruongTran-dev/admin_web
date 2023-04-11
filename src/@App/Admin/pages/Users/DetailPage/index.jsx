import React from "react";
import UserForm from "./UserForm";
import AdminContentPage from "../../../components/Layout/AdminContentPage";
import { useUserDetail } from "./hooks/useUserDetail";
import { Box, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DetailPage = (props) => {
  const { isEdit, user, loadingUser } = useUserDetail();
  const navigate = useNavigate();
  return loadingUser ? (
    <Box className="mt-40 text-center">
      <CircularProgress />
    </Box>
  ) : (
    <AdminContentPage
      pageTitle="Thêm mới user"
      headerAction={
        <Button
          variant="contained"
          color="error"
          onClick={() => navigate("/admin/user")}
        >
          Trở lại
        </Button>
      }
      content={<UserForm isEdit={isEdit} user={user} />}
    />
  );
};

export default React.memo(DetailPage);
