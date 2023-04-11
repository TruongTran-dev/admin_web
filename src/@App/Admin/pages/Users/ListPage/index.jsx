import React, { useEffect, useMemo } from "react";
import UserTable from "./components/UserTable";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminContentPage from "../../../components/Layout/AdminContentPage";
import UserProvider from "./UserProvider";
import UserFilterTable from "./components/UserFilterTable";

const ListPage = (props) => {
  const navigate = useNavigate();

  return (
    <UserProvider>
      <AdminContentPage
        pageTitle={
          <Box className="flex items-center">
            Danh sách user
            <UserFilterTable />
          </Box>
        }
        headerAction={
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/admin/user/new")}
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
