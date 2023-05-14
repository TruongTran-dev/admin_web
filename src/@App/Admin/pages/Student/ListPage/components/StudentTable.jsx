import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminPageContext } from "../../../../components/Provider/AdminPageProvider";
import CoreTable, {
  columnHelper,
} from "../../../../../../@Core/components/Table/CoreTable";
import { Avatar, Box, Chip, IconButton, Tooltip } from "@mui/material";
import {
  CoreActionDelete,
  CoreActionEdit,
} from "../../../../../../@Core/components/Table/components/CoreTableAction";
import { ROUTER_TEACHER } from "../../../../configs/constants";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import moment from "moment";

const StudentTable = (props) => {
  const navigate = useNavigate();
  const { tableHandler, handleDelete, methodForm } = useAdminPageContext();

  const { watch } = methodForm;

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("id", {
        cell: (info) => info.getValue(),
        header: "Id",
      }),
      columnHelper.accessor("code", {
        cell: (info) => info.getValue(),
        header: "SSID",
      }),
      columnHelper.accessor("imageUrl", {
        header: "Ảnh đại diện",
        cell: (info) => (
          <Avatar
            src={info.getValue()}
            style={{ width: "100px", height: "100px" }}
          />
        ),
      }),
      columnHelper.accessor("name", {
        cell: (info) => info.getValue(),
        header: "Họ tên học sinh",
      }),
      columnHelper.accessor("dateOfBirth", {
        cell: (info) => moment(info.getValue()).format("DD-MM-YYYY"),
        header: "Ngày sinh",
      }),
      columnHelper.accessor("hk1SubjectMediumScore", {
        cell: (info) => info.getValue(),
        header: "Điểm TBHK1",
      }),
      columnHelper.accessor("hk2SubjectMediumScore", {
        cell: (info) => info.getValue(),
        header: "Điểm TBHK2",
      }),
      columnHelper.accessor("mediumScore", {
        cell: (info) => info.getValue(),
        header: "Điểm TB cả năm",
      }),

      columnHelper.accessor("action", {
        header: "Hành động",
        cell: ({ row }) => {
          const data = row.original;
          return (
            <div className="flex">
              <Tooltip title="Xem điểm">
                <IconButton
                  onClick={() =>
                    navigate({
                      pathname: `/teacher/learning-result/${data?.id}/${watch(
                        "semesterYear"
                      )}`,
                    })
                  }
                  color="warning"
                >
                  <CreditScoreIcon />
                </IconButton>
              </Tooltip>

              <CoreActionEdit
                onClick={() =>
                  navigate(`${ROUTER_TEACHER.student.list}/${data?.id}`)
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

export default React.memo(StudentTable);
