import React, { useEffect, useMemo } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminContentPage from "../../../components/Layout/AdminContentPage";
import CategoryProvider from "./CategoryProvider";
import ListCategory from "./components/ListCategory";
import CategoryFilter from "./components/CategoryFilter";

const ListPage = (props) => {
  const navigate = useNavigate();

  return (
    <CategoryProvider>
      <AdminContentPage
        pageTitle={
          <Box className="flex items-center">
            Danh sách danh mục thu chi
            <CategoryFilter />
          </Box>
        }
        headerAction={
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/admin/category/new")}
          >
            Thêm mới
          </Button>
        }
        content={<ListCategory />}
      />
    </CategoryProvider>
  );
};

export default React.memo(ListPage);
