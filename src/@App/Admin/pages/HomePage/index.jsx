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

import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";
import ChartOverview from "./ChartOverview";
import ChartPartners from "./ChartPartners";
import ChartSale from "./ChartSale";
import AdminContentPage from "../../components/Layout/AdminContentPage";

const HomePage = (props) => {
  return (
    <AdminContentPage
      pageTitle="Dashboard"
      content={
        <Box className="flex flex-wrap mt-40">
          <Box className="w-full sm:w-1/2 px-12 mb-40">
            <Card>
              <CardContent>
                <Typography variant="subtitle2" className="mb-12">
                  SALES
                </Typography>

                <ChartSale />
              </CardContent>
            </Card>
          </Box>
          <Box className="w-full sm:w-1/2 px-12 mb-40">
            <Card>
              <CardContent>
                <Typography variant="subtitle2" className="mb-12">
                  OVERVIEW
                </Typography>

                <ChartOverview />
              </CardContent>
            </Card>
          </Box>
        </Box>
      }
    />
  );
};

// HomePage.defaultProps = {}

// HomePage.propTypes = {}

export default React.memo(HomePage);
