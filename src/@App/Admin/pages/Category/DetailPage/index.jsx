import React from "react";
import AdminContentPage from "../../../components/Layout/AdminContentPage";
import { useCategoryDetail } from "./hooks/useCategoryDetail";
import { Box, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CategoryForm from "./CategoryForm";

const DetailPage = (props) => {
  const { isEdit, category, loadingCategory } = useCategoryDetail();
  const navigate = useNavigate();
  return loadingCategory ? (
    <Box className="mt-40 text-center">
      <CircularProgress />
    </Box>
  ) : (
    <AdminContentPage
      pageTitle={isEdit ? "Chỉnh sửa danh mục" : "Thêm mới danh mục"}
      headerAction={
        <Button
          variant="contained"
          color="error"
          onClick={() => navigate("/admin/category")}
        >
          Trở lại
        </Button>
      }
      content={<CategoryForm isEdit={isEdit} category={category} />}
    />
  );
};

export default React.memo(DetailPage);
