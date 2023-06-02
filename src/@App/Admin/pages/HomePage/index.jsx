/*
 * Created Date: 23-10-2022, 9:41:26 am
 * Author: TheAnh58
 * Email: you@you.you
 * -----
 * Last Modified: Mon Oct 24 2022
 * Modified By: Peter
 * -----
 * Copyright (c) 2022 PROS+ Group , Inc
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 */

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import ChartOverview from "./ChartOverview";
import ChartPartners from "./ChartPartners";
import ChartSale from "./ChartSale";
import AdminContentPage from "../../components/Layout/AdminContentPage";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const HomePage = (props) => {
  const navigate = useNavigate();
  const cmsInfor = Cookies.get("ACCOUNT_INFO")
    ? JSON.parse(Cookies.get("ACCOUNT_INFO"))
    : null;

  return (
    <AdminContentPage
      pageTitle="Overview"
      content={
        <Box className="flex flex-nowrap mt-40 w-2/3 mx-auto">
          <Card className="w-1/3 mx-20 rounded-20">
            <img
              src="https://img.freepik.com/free-icon/class-group_318-59057.jpg"
              className="mx-auto w-[100px] h-[100px] my-20"
            />
            <Box className="flex items-center justify-center text-[20px] mb-8">
              <Typography className="text-[30px] mr-8">12</Typography>
              lớp
            </Box>
            <Box className="flex items-center justify-center text-[20px] mb-28">
              <Typography className="text-[30px] mr-8">450</Typography>
              học sinh
            </Box>
            <Divider />
            <Box
              className="flex text-[20px] cursor-pointer hover:text-[#0A8FDC] my-8 justify-center items-center space-x-8"
              onClick={() =>
                cmsInfor?.roles?.includes("ROLE_TEACHER") ||
                cmsInfor?.roles?.includes("ADMIN")
                  ? navigate("/teacher/classes")
                  : null
              }
            >
              Xem chi tiết
              <ChevronRightIcon className="text-[30px]" />
            </Box>
          </Card>
          <Card className="w-1/3 mx-20 rounded-20">
            <img
              src="https://icons.veryicon.com/png/o/miscellaneous/news-editing-icon-library/topic-selection-person-in-charge.png"
              className="mx-auto w-[100px] h-[100px] my-20"
            />
            <Box className="flex items-center justify-center text-[20px] mb-8">
              <Typography className="text-[40px] mr-8">14</Typography>
            </Box>
            <Box className="flex items-center justify-center text-[20px] mb-28">
              Môn học
            </Box>
            <Divider />
            <Box
              className="flex text-[20px] cursor-pointer hover:text-[#0A8FDC] my-8 justify-center items-center space-x-8"
              onClick={() =>
                cmsInfor?.roles?.includes("ROLE_TEACHER") ||
                cmsInfor?.roles?.includes("ADMIN")
                  ? navigate("/admin/subject")
                  : null
              }
            >
              Xem chi tiết
              <ChevronRightIcon className="text-[30px]" />
            </Box>
          </Card>
          <Card className="w-1/3 mx-20 rounded-20">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4363/4363382.png"
              className="mx-auto w-[100px] h-[100px] my-20"
            />
            <Box className="flex items-center justify-center text-[20px] mb-8">
              <Typography className="text-[40px] mr-8">05</Typography>
            </Box>
            <Box className="flex items-center justify-center text-[20px] mb-28">
              Bài viết thông báo{" "}
            </Box>
            <Divider />
            <Box
              className="flex text-[20px] cursor-pointer hover:text-[#0A8FDC] my-8 justify-center items-center space-x-8"
              onClick={() =>
                cmsInfor?.roles?.includes("ROLE_TEACHER") ||
                cmsInfor?.roles?.includes("ADMIN")
                  ? navigate("/teacher/news")
                  : null
              }
            >
              Xem chi tiết
              <ChevronRightIcon className="text-[30px]" />
            </Box>
          </Card>
        </Box>
      }
    />
  );
};

// HomePage.defaultProps = {}

// HomePage.propTypes = {}

export default React.memo(HomePage);
