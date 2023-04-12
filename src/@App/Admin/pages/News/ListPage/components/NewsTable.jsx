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
import CoreTable, {
  columnHelper,
} from "../../../../../../@Core/components/Table/CoreTable";
import { Box, Chip } from "@mui/material";
import {
  CoreActionDelete,
  CoreActionEdit,
} from "../../../../../../@Core/components/Table/components/CoreTableAction";
import { ROUTER_ADMIN } from "../../../../configs/constants";

const NewsTable = (props) => {
  const navigate = useNavigate();
  const { tableHandler, handleDelete } = useAdminPageContext();

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("id", {
        cell: (info) => info.getValue(),
        header: "Id",
      }),
      columnHelper.accessor("title", {
        cell: (info) => info.getValue(),
        header: "Tiêu đề",
      }),
      columnHelper.accessor("content", {
        cell: (info) => info.getValue(),
        header: "Nội dung",
      }),

      columnHelper.accessor("action", {
        header: "Hành động",
        cell: ({ row }) => {
          const data = row.original;
          return (
            <div className="flex">
              <CoreActionEdit
                onClick={() =>
                  navigate(`${ROUTER_ADMIN.user.list}/${data?.id}`)
                }
              />
              <CoreActionDelete
                disabled={data?.role?.find((i) => i?.name === "ROLE_ADMIN")}
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

export default React.memo(NewsTable);
