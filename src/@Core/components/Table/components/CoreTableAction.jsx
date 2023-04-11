import { IconButton, Tooltip, useTheme } from "@mui/material";
import { BiEdit, BiShow, BiTrash } from "react-icons/bi";
import { useConfirm } from "../../Confirm/CoreConfirm";

/*
 * Created Date: 04-09-2022, 9:42:53 am
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
export const CoreActionEdit = ({ onClick = () => {}, disabled = false }) => {
  if (disabled) {
    return (
      <IconButton disabled color="primary">
        <BiEdit />
      </IconButton>
    );
  }
  return (
    <Tooltip title="Chỉnh sửa">
      <IconButton onClick={onClick} color="primary">
        <BiEdit />
      </IconButton>
    </Tooltip>
  );
};

export const CoreActionView = ({
  onClick = () => {},
  title = null,
  placement,
}) => {
  const theme = useTheme();
  return (
    <Tooltip title={title ?? "Xem chi tiết"} placement={placement}>
      <IconButton
        style={{ color: theme.palette.success.main }}
        onClick={onClick}
      >
        <BiShow />
      </IconButton>
    </Tooltip>
  );
};

export const CoreActionDelete = ({
  onConfirmDelete = () => {},
  disabled = false,
}) => {
  const confirm = useConfirm();

  const handleClickDelete = () => {
    confirm({
      content: "Bạn có chắc chắn muốn xóa thông tin này không?",
      color: "error",
      onOk: onConfirmDelete,
      zIndex: 9999,
    });
  };

  if (disabled) {
    return (
      <IconButton color="error" disabled={disabled}>
        <BiTrash />
      </IconButton>
    );
  }
  return (
    <Tooltip title="Xóa">
      <IconButton onClick={handleClickDelete} color="error">
        <BiTrash />
      </IconButton>
    </Tooltip>
  );
};
