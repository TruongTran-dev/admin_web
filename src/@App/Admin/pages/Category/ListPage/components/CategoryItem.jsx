import { Box, Collapse, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  CoreActionDelete,
  CoreActionEdit,
} from "../../../../../../@Core/components/Table/components/CoreTableAction";
import { useNavigate } from "react-router-dom";
import { ROUTER_ADMIN } from "../../../../configs/constants";
import { categorySerivce } from "../../../../services/categoryService";
import { errorMsg, successMsg } from "../../../../../../@Core/helper/Message";
import { useAdminPageContext } from "../../../../components/Provider/AdminPageProvider";
// import PropTypes from 'prop-types'

const CategoryItem = (props) => {
  const { item } = props;
  const { getCategory } = useAdminPageContext();
  const [showChildren, setShowChildren] = useState(false);
  const navigate = useNavigate();

  const renderAction = (id) => {
    return (
      <>
        <CoreActionEdit
          onClick={() => navigate(`${ROUTER_ADMIN.category.list}/${id}`)}
        />
        <CoreActionDelete
          onConfirmDelete={async () => {
            try {
              await categorySerivce.delete(id);
              getCategory();
              successMsg("Xóa danh mục thành công");
            } catch (error) {
              errorMsg("Xóa danh mục thất bại");
            }
          }}
        />
      </>
    );
  };

  const renderCategoryChildren = () => {
    return Array.isArray(item?.childCategory) &&
      item?.childCategory?.length > 0 ? (
      <Box>
        {item?.childCategory?.map((children) => (
          <Box
            key={item?.id}
            className="flex items-center justify-between py-4 pl-20 pr-8"
            sx={{ backgroundColor: "#E5EEE7" }}
          >
            <Box className="flex items-center">
              <img
                src={children?.logoImage}
                className="w-[50px] h-[50px] mr-6"
                style={{ borderRadius: "100%" }}
              />
              <Box>
                <Box className="font-bold">{children?.name}</Box>(
                {children?.categoryType === "EXPENSE" ? "Chi tiêu" : "Thu nhập"}
                )
              </Box>
            </Box>
            <Box>{renderAction(children?.id)}</Box>
          </Box>
        ))}
      </Box>
    ) : (
      <Box className="italic text-center">Không có danh mục con nào</Box>
    );
  };
  return (
    <Box className="mb-4">
      <Box
        className="flex items-center justify-between px-8 py-2 cursor-pointer rounded-4 "
        sx={{ backgroundColor: "#CCDECF" }}
      >
        <Box className="flex items-center">
          <img
            src={item?.logoImage}
            className="w-[50px] h-[50px] mr-6"
            style={{ borderRadius: "100%" }}
          />
          <Box>
            <Box className="font-bold">{item?.name}</Box>(
            {item?.categoryType === "EXPENSE" ? "Chi tiêu" : "Thu nhập"})
          </Box>
        </Box>
        <Box>
          {renderAction(item?.id)}
          <Tooltip title={showChildren ? "Ẩn bớt" : "Xem thêm"}>
            <IconButton onClick={() => setShowChildren((prev) => !prev)}>
              {!showChildren ? (
                <KeyboardArrowDownIcon />
              ) : (
                <KeyboardArrowUpIcon />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Collapse in={showChildren}>{renderCategoryChildren()}</Collapse>
    </Box>
  );
};

// CategoryItem.defaultProps = {}

// CategoryItem.propTypes = {}

export default React.memo(CategoryItem);
