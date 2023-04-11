/*
 * Created Date: 22-10-2022, 3:15:13 pm
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

import {
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import {
  useLocation,
  useMatch,
  useMatches,
  useNavigate,
} from "react-router-dom";
import { needsToBeOpened } from "./LeftMenuItemCollapse";
// import PropTypes from 'prop-types'
const isMenuSelected = (matches = [], item) => {
  return matches.find((i) => i.pathname === item?.url) ?? null;
};
const LeftMenuItem = (props) => {
  const { item, sx } = props;

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const matches = useMatches();
  const match = isMenuSelected(matches, item);
  // console.log('============= match', match)

  // console.log('============= matches', matches)
  const handleClickMenu = (url) => {
    if (url) navigate(url);
  };

  return (
    <>
      <ListItem
        disablePadding
        onClick={() => handleClickMenu(item?.url)}
        sx={sx}
        selected={Boolean(match)}
      >
        <ListItemButton>
          {item?.icon}

          <ListItemText primary={item.title} className="ml-4" />
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
};

//LeftMenuItem.defaultProps = {}

//LeftMenuItem.propTypes = {}

export default React.memo(LeftMenuItem);
