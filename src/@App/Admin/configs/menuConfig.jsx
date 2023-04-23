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

import { ROUTER_ADMIN, ROUTER_TEACHER } from "./constants";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { Icon } from "@mui/material";
import { BiNews } from "react-icons/bi";
import SubjectIcon from "@mui/icons-material/Subject";
import ClassIcon from "@mui/icons-material/Class";

export const menuAdminConfig = [
  {
    title: "Quản lý user",
    url: ROUTER_ADMIN.user.list,
    icon: <GroupOutlinedIcon />,
  },
  {
    title: "Quản lý môn học",
    url: ROUTER_ADMIN.subjects.list,
    icon: <SubjectIcon />,
  },
];

export const menuTeacherConfig = [
  {
    title: "Quản lý bài viết",
    url: ROUTER_TEACHER.news.list,
    icon: (
      <Icon>
        <BiNews />
      </Icon>
    ),
  },

  {
    title: "Quản lý lớp học",
    url: ROUTER_TEACHER.classes.list,
    icon: <ClassIcon />,
  },
];
