import React, { useEffect, useMemo } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CategoryLogoTable from "./components/CategoryLogoTable";
import AdminContentPage from "../../components/Layout/AdminContentPage";
import CategoryLogoProvider from "./CategoryLogoProvider";
import { useUploadLogoDialog } from "./hooks/useUploadLogoDialog";

const ListPage = (props) => {
  const navigate = useNavigate();
  const { handleOpen, renderUploadLogoDialog } = useUploadLogoDialog();

  return (
    <CategoryLogoProvider>
      <AdminContentPage
        pageTitle={<Box className="flex items-center">Danh sách logo</Box>}
        headerAction={
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Upload
          </Button>
        }
        content={<CategoryLogoTable />}
      />
      {renderUploadLogoDialog()}
    </CategoryLogoProvider>
  );
};

export default React.memo(ListPage);
