/*
 * Created Date: 11-10-2022, 12:22:02 am
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

import { ROUTER_ADMIN } from "./constants";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

export const menuAdminConfig = [
  {
    title: "Trang chủ",
    url: ROUTER_ADMIN.homePage,
    icon: <HomeOutlinedIcon />,
  },
  {
    title: "Quản lý user",
    url: ROUTER_ADMIN.user.list,
    icon: <GroupOutlinedIcon />,
  },
  {
    title: "Quản lý danh mục",
    url: ROUTER_ADMIN.category.list,
    icon: <CategoryOutlinedIcon />,
  },
  {
    title: "Quản lý logo danh mục",
    url: ROUTER_ADMIN.categoryLogo.list,
    icon: <ImageOutlinedIcon />,
  },
];
