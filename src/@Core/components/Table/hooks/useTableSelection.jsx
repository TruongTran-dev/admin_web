import { Checkbox } from "@mui/material";
import React from "react";
import { useMemo } from "react";
import { useState } from "react";
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return <Checkbox ref={resolvedRef} {...rest} />;
  }
);

export const useTableSelection = (props) => {
  const { hasRowSelection } = props;
  const [rowSelection, setRowSelection] = useState({});

  const columnSelection = useMemo(() => {
    if (!hasRowSelection) return null;
    return {
      id: "select",
      header: ({ table }) => {
        return (
          <>
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />
          </>
        );
      },
      cell: ({ row }) => (
        <div className="px-1">
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
    };
  }, [JSON.stringify(rowSelection)]);

  return {
    columnSelection,
    rowSelection,
    setRowSelection,
  };
};
