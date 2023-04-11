import { Box, Button, Collapse } from "@mui/material";
import React from "react";
import { BiTrash } from "react-icons/bi";
import { useConfirm } from "../../Confirm/CoreConfirm";
import { useCoreTableContext } from "../CoreTable";
// import PropTypes from 'prop-types'
// import {} from 'lodash'
const CoreTableToolbar = (props) => {
  const { handleFetchData } = props;
  const { rowSelection, table, onConfirmMassDelete, hasMassDelete } =
    useCoreTableContext();
  const confirm = useConfirm();
  const selectedRowData = table
    .getSelectedRowModel()
    .flatRows.map((row) => row.original);
  // console.log('============= rowSelection', selectedRowData)

  const handleMassDelete = () => {
    confirm({
      content: t("table.mass_delete_confirm"),
      onOk: () => onConfirmMassDelete(selectedRowData),
      zIndex: 9999,
    });
  };

  return (
    <Box className="mx-8 my-4">
      <Collapse in={hasMassDelete && Object.keys(rowSelection).length > 0}>
        <Button
          variant="contained"
          size="small"
          color="warning"
          startIcon={<BiTrash />}
          onClick={handleMassDelete}
        >
          12312
        </Button>
      </Collapse>
    </Box>
  );
};

//CoreTableToolbar.defaultProps = {}

//CoreTableToolbar.propTypes = {}

export default React.memo(CoreTableToolbar);
