import { useNavigate } from "react-router-dom";
import { useAdminPageContext } from "../../../components/Provider/AdminPageProvider";
import React, { useMemo } from "react";
import CoreTable, {
  columnHelper,
} from "../../../../../@Core/components/Table/CoreTable";
import {
  CoreActionDelete,
  CoreActionEdit,
} from "../../../../../@Core/components/Table/components/CoreTableAction";
import { errorMsg } from "../../../../../@Core/helper/Message";
import { classService } from "../../../services/classService";

const ClassTable = (props) => {
  const { tableHandler, handleDelete, methodForm } = useAdminPageContext();

  const { setValue } = methodForm;

  const handleClickBtnEdit = async (data) => {
    try {
      const res = await classService.find(data?.id);
      setValue("id", res?.id);
      setValue("name", res?.name);
      setValue("year", res?.year);
      setValue("subjectIds", res?.subjectDatas?.map((i) => i?.id) ?? []);
    } catch (error) {
      errorMsg("Lấy chi tiết lớp học thất bại");
    }
    setValue("id", data?.id);
    setValue("name", data?.name);
  };

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("id", {
        cell: (info) => info.getValue(),
        header: "Id",
      }),
      columnHelper.accessor("code", {
        cell: (info) => info.getValue(),
        header: "Mã lớp học",
      }),

      columnHelper.accessor("name", {
        cell: (info) => info.getValue(),
        header: "Tên lớp học",
      }),

      columnHelper.accessor("year", {
        cell: (info) => info.getValue(),
        header: "Năm học",
      }),

      columnHelper.accessor("action", {
        header: "Hành động",
        cell: ({ row }) => {
          const data = row.original;
          return (
            <div className="flex">
              <CoreActionEdit onClick={() => handleClickBtnEdit(data)} />
              <CoreActionDelete
                onConfirmDelete={() => handleDelete(data?.id)}
              />
            </div>
          );
        },
      }),
    ];
  }, []);

  return <CoreTable isShowPagination columns={columns} {...tableHandler} />;
};

//ListSpotTable.defaultProps = {}

//ListSpotTable.propTypes = {}

export default React.memo(ClassTable);
