import React from "react";
import AdminContentPage from "../../../components/Layout/AdminContentPage";
import { useNewsDetail } from "./hooks/useNewsDetail";
import { Box, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NewsForm from "./NewsForm";

const DetailPage = (props) => {
  const { isEdit, news, loadingNews } = useNewsDetail();
  const navigate = useNavigate();
  return loadingNews ? (
    <Box className="mt-40 text-center">
      <CircularProgress />
    </Box>
  ) : (
    <AdminContentPage
      pageTitle="Thêm mới bài viết"
      headerAction={
        <Button
          variant="contained"
          color="error"
          onClick={() => navigate("/teacher/news")}
        >
          Trở lại
        </Button>
      }
      content={<NewsForm isEdit={isEdit} news={news} />}
    />
  );
};

export default React.memo(DetailPage);
