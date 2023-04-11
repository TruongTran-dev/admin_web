/*
 * Created Date: 10-10-2022, 11:49:50 pm
 * Author: Peter
 * Email: phantrung696@gmail.com
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * Copyright (c) 2022 PROS+ Group , Inc
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 */
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const AuthCmsLayout = (props) => {
  const navigate = useNavigate();
  const cmsInfor = !!Cookies.get("ACCOUNT_INFO");

  // const xsrfToken = !!Cookies.get("XSRF-TOKEN");

  useEffect(() => {
    if (cmsInfor) {
      navigate(`/admin/home-page`);
    }
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Box
          className="admin-content flex flex-col h-full"
          // sx={{ minHeight: `calc(100vh - 200px)` }}
        >
          <React.Suspense
            fallback={
              <div className="mt-200 text-center">
                <CircularProgress />
              </div>
            }
          >
            <Outlet />
          </React.Suspense>
        </Box>
      </Box>
    </Box>
  );
};

//AdminCmsLayout.defaultProps = {}

//AdminCmsLayout.propTypes = {}

export default React.memo(AuthCmsLayout);
