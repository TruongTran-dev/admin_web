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
import { Box } from "@mui/material";
import { useAdminPageContext } from "../../../components/Provider/AdminPageProvider";
import CoreTable, {
  columnHelper,
} from "../../../../../@Core/components/Table/CoreTable";
import { CoreActionDelete } from "../../../../../@Core/components/Table/components/CoreTableAction";

const CategoryLogoTable = (props) => {
  const navigate = useNavigate();
  const { tableHandler, handleDelete } = useAdminPageContext();

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("id", {
        cell: (info) => info.getValue(),
        header: "Id",
      }),
      columnHelper.accessor("fileUrl", {
        header: "Logo",
        cell: (info) => (
          <img
            src={info.getValue()}
            style={{ width: "50px", height: "50px" }}
            className="rounded-full"
          />
        ),
      }),
      columnHelper.accessor("fileName", {
        header: "File name",
      }),
      columnHelper.accessor("action", {
        header: "Hành động",
        cell: ({ row }) => {
          const data = row.original;
          return (
            <div className="flex">
              <CoreActionDelete
                onConfirmDelete={() => handleDelete(data?.id)}
              />
            </div>
          );
        },
      }),
    ];
  }, []);

  return (
    <Box>
      <CoreTable isShowPagination columns={columns} {...tableHandler} />
    </Box>
  );
};

//ListSpotTable.defaultProps = {}

//ListSpotTable.propTypes = {}

export default React.memo(CategoryLogoTable);
