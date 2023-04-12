/*
 * Created Date: 11-10-2022, 12:08:23 am
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
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {
  Divider,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";

import LeftMenuItem from "../Menu/LeftMenuItem";
import { menuAdminConfig, menuTeacherConfig } from "../../configs/menuConfig";
import LeftMenuItemCollapse from "../Menu/LeftMenuItemCollapse";
import { authService } from "../../services/authService";
import { BiLogOut } from "react-icons/bi";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const LeftMenu = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    // Remove all Cookie
    Object.keys(Cookies.get()).forEach(function (cookieName) {
      var neededAttributes = {};
      Cookies.remove(cookieName, neededAttributes);
    });
    await navigate(`/admin/login`);
  };

  return (
    <Box>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <HomeOutlinedIcon />
            <ListItemText
              primary={"Trang chủ"}
              className="ml-4"
              onClick={() => navigate("/admin/home-page")}
            />
          </ListItemButton>
        </ListItem>
        {menuAdminConfig.map((item, index) => {
          if (item?.type === "collapse") {
            return <LeftMenuItemCollapse key={index} item={item} />;
          }
          return <LeftMenuItem key={index} item={item} />;
        })}
        {menuTeacherConfig.map((item, index) => {
          if (item?.type === "collapse") {
            return <LeftMenuItemCollapse key={index} item={item} />;
          }
          return <LeftMenuItem key={index} item={item} />;
        })}
        <ListItem disablePadding>
          <ListItemButton>
            <Icon>
              <BiLogOut />
            </Icon>
            <ListItemText
              primary={"Đăng xuất"}
              className="ml-4"
              onClick={handleLogout}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

//LeftMenu.defaultProps = {}

//LeftMenu.propTypes = {}

export default React.memo(LeftMenu);
