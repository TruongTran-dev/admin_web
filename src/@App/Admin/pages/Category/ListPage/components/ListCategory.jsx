/*
 * Created Date: 12-10-2022, 3:36:47 pm
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

import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminPageContext } from "../../../../components/Provider/AdminPageProvider";
import { Box, Chip, CircularProgress, Skeleton } from "@mui/material";
import CategoryItem from "./CategoryItem";

const UserTable = (props) => {
  const navigate = useNavigate();
  const { category, loadingCategory } = useAdminPageContext();

  console.log("============= category", category);

  return (
    <Box className="h-[700px] w-full sm:w-4/5 mx-auto overflow-auto">
      {loadingCategory
        ? [1, 2, 3, 4, 5, 6].map((item) => (
            <Skeleton key={item} className="py-12 mb-8" variant="rectangular" />
          ))
        : category?.map((item) => {
            return <CategoryItem key={item?.id} item={item} />;
          })}
    </Box>
  );
};

//ListSpotTable.defaultProps = {}

//ListSpotTable.propTypes = {}

export default React.memo(UserTable);
