import React, { useEffect, useMemo } from "react";
import UserTable from "./components/NewsTable";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminContentPage from "../../../components/Layout/AdminContentPage";
import UserProvider from "./NewsProvider";
import UserFilterTable from "./components/NewsFilterTable";
import NewsFilterTable from "./components/NewsFilterTable";

const ListPage = (props) => {
  const navigate = useNavigate();

  return (
    <UserProvider>
      <AdminContentPage
        pageTitle={
          <Box className="flex items-center">
            Danh sách bài viết
            <NewsFilterTable />
          </Box>
        }
        headerAction={
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/teacher/news/new")}
          >
            Thêm mới
          </Button>
        }
        content={<UserTable />}
      />
    </UserProvider>
  );
};

export default React.memo(ListPage);
