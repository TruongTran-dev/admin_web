import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminPageContext } from "../../../../components/Provider/AdminPageProvider";
import CoreTable, {
  columnHelper,
} from "../../../../../../@Core/components/Table/CoreTable";
import { Box, Chip, IconButton } from "@mui/material";
import {
  CoreActionDelete,
  CoreActionEdit,
} from "../../../../../../@Core/components/Table/components/CoreTableAction";
import { ROUTER_ADMIN, ROUTER_TEACHER } from "../../../../configs/constants";
import moment from "moment/moment";
import { BiLinkAlt } from "react-icons/bi";

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
      columnHelper.accessor("createdName", {
        cell: (info) => info.getValue() ?? "Admin",
        header: "Người tạo",
      }),
      columnHelper.accessor("typeMedia", {
        cell: (info) => (info.getValue() == 0 ? "Video" : "Ảnh"),
        header: "Kiểu media",
      }),
      columnHelper.accessor("mediaUrl", {
        header: "Link",
        cell: (info) => (
          <a href={info.getValue()} target="_blank">
            <IconButton color="primary">
              <BiLinkAlt />
            </IconButton>
          </a>
        ),
      }),
      columnHelper.accessor("createdTime", {
        cell: (info) => moment(info.getValue()).format("DD/MM/YYYY"),
        header: "Thời gian tạo",
      }),
      columnHelper.accessor("createBy", {
        cell: (info) => info.getValue(),
        header: "Người tạo",
      }),

      columnHelper.accessor("action", {
        header: "Hành động",
        cell: ({ row }) => {
          const data = row.original;
          return (
            <div className="flex">
              <CoreActionEdit
                onClick={() =>
                  navigate(`${ROUTER_TEACHER.news.list}/${data?.id}`)
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
