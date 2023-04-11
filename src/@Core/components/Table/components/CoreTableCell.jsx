/*
 * Created Date: 16-08-2022, 5:27:47 pm
 * Author: Peter
 * Email: phantrung696@gmail.com
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * Copyright (c) 2022 PT CORP, Inc
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 */
import { TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

// import PropTypes from 'prop-types'
const StyledTableCell = styled(TableCell)(() => ({
  fontSize: 14,
  padding: 8,
  fontWeight: 400,
  "&:first-of-type": {
    paddingLeft: 20,
  },
  "&:last-of-type": {
    paddingRight: 20,
  },
}));
const CoreTableCell = (props) => {
  return <StyledTableCell>{props.children}</StyledTableCell>;
};

//CoreTableCell.defaultProps = {}

//CoreTableCell.propTypes = {}

export default React.memo(CoreTableCell);
