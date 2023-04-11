/*
 * Created Date: 11-10-2022, 12:55:59 am
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

import React from "react";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";

import { styled } from "@mui/material/styles";

const TableHeaderRow = styled(TableRow)(({ theme }) => {
  return {
    "& th": {
      fontSize: 14,
      padding: 8,
      fontWeight: 700,
      color: theme.palette.text.primary,
      "&:first-of-type": {
        paddingLeft: 20,
      },
      "&:last-of-type": {
        paddingRight: 20,
      },
      backgroundColor: "#F4F7FE",
    },
  };
});

const CoreTableHeader = ({ children, ...rest }) => {
  return <TableHeaderRow {...rest}>{children}</TableHeaderRow>;
};

export default CoreTableHeader;
CoreTableHeader.propTypes = {
  children: PropTypes.node,
};
