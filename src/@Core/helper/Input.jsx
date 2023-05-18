import { Box } from "@mui/material";
import isFunction from "lodash/isFunction";
import React, { useCallback } from "react";
import { NumericFormat } from "react-number-format";

export const NumberFormatCustom = React.forwardRef((props, ref) => {
  const { onChange, ...other } = props;

  const handleChange = useCallback(
    (value) => {
      if (isFunction(onChange)) {
        onChange({
          target: {
            name: props.name,
            value: value.value,
          },
        });
      }
    },
    [props.name, onChange]
  );

  return (
    <NumericFormat
      {...other}
      decimalSeparator="."
      isNumericString
      // thousandSeparator="."
      getInputRef={ref}
      onValueChange={handleChange}
    />
  );
});
