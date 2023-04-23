import React, { useEffect, useMemo } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminContentPage from "../../../components/Layout/AdminContentPage";
import StudentFilterTable from "./components/StudentFilterTable";
import StudentTable from "./components/StudentTable";
import StudentProvider from "./StudentProvider";

const ListPage = (props) => {
  const navigate = useNavigate();

  return (
    <StudentProvider>
      <AdminContentPage
        pageTitle={
          <Box className="flex items-center">
            Danh sách học sinh
            <StudentFilterTable />
          </Box>
        }
        headerAction={
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/teacher/student/new")}
          >
            Thêm mới
          </Button>
        }
        content={<StudentTable />}
      />
    </StudentProvider>
  );
};

export default React.memo(ListPage);
