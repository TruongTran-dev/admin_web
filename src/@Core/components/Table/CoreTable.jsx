import { CircularProgress, Table, TableContainer } from "@mui/material";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useContext, useMemo } from "react";
import CoreTableBody from "./components/CoreTableBody";
import CoreTableHead from "./components/CoreTableHead";
import CoreTableToolbar from "./components/CoreTableToolbar";
import TablePaginationV2 from "./components/TablePaginationV2";
import { useTableSelection } from "./hooks/useTableSelection";
// import PropTypes from 'prop-types'
const CoreTableContext = React.createContext();

export const useCoreTableContext = () => useContext(CoreTableContext);

export const columnHelper = createColumnHelper();
const CoreTable = ({
  data = [],
  columns = [],
  total = 0,
  isShowPagination = false,
  pageSize = 10,
  pageIndex = 1,
  pageNumber = 1,
  totalPage = 1,
  handleFetchData = () => {},
  loading = false,
  hasRowSelection = false,
  onConfirmMassDelete = () => {},
  hasMassDelete = false,
  ...restProps
}) => {
  const rerender = React.useReducer(() => ({}), {})[1];
  const defaultData = React.useMemo(() => [], []);
  const { columnSelection, rowSelection, setRowSelection } = useTableSelection({
    hasRowSelection,
  });

  console.log("============= data", data);
  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageNumber, pageSize]
  );

  const columnTable = useMemo(() => {
    return [columnSelection, ...columns].filter(Boolean);
  }, [columns, rowSelection, data]);

  const table = useReactTable({
    data: data ?? defaultData,
    columns: columnTable,
    pageCount: total,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination,
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    // onPaginationChange: setPagination,
    manualPagination: true,
    debugTable: true,
  });

  return (
    <CoreTableContext.Provider
      value={{ table, rowSelection, onConfirmMassDelete, hasMassDelete }}
    >
      <CoreTableToolbar handleFetchData={handleFetchData} />
      <TableContainer
        className="relative"
        sx={{
          "& tr > th": {
            whiteSpace: "nowrap",
          },
          maxHeight: "calc(100vh - 300px)",
          border: "1px solid #E0E0E0",
        }}
      >
        <Table sx={{ minWidth: 650 }} stickyHeader className="table">
          <CoreTableHead
            table={table}
            columns={columns}
            rowSelection={rowSelection}
          />
          <CoreTableBody table={table} />
        </Table>
        {loading && (
          <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center z-100">
            <CircularProgress />
          </div>
        )}
      </TableContainer>
      {isShowPagination && (
        <TablePaginationV2
          pageIndex={pageIndex}
          pageSize={pageSize}
          pageNumber={pageNumber}
          total={total}
          totalPage={totalPage}
          fetchData={handleFetchData}
          {...restProps}
        />
      )}
    </CoreTableContext.Provider>
  );
};

//CoreTable.defaultProps = {}

//CoreTable.propTypes = {}

export default React.memo(CoreTable);
