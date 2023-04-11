/*
 * Created Date: 11-10-2022, 12:29:57 am
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
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";

const AdminContentPage = (props) => {
  const { content, pageTitle, headerAction, tabHeader } = props;
  return (
    <Card className="w-full h-full shadow-4">
      {pageTitle && (
        <CardHeader
          title={
            <Typography variant="h3" className="uppercase font-400">
              {pageTitle}
            </Typography>
          }
          action={headerAction}
        />
      )}
      <Box>{tabHeader}</Box>
      <Divider />
      <Box className="mx-12 my-8">{content}</Box>
    </Card>
  );
};

//AdminContentPage.defaultProps = {}

AdminContentPage.propTypes = {
  content: PropTypes.any,
  pageTitle: PropTypes.any,
  headerAction: PropTypes.any,
  tabHeader: PropTypes.any,
};

export default React.memo(AdminContentPage);
