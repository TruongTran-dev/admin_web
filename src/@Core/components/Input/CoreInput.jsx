/*
 * Created Date: 10-10-2022, 10:03:15 pm
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

import { Box, FormHelperText, TextField } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useController } from "react-hook-form";

const CoreInput = (props) => {
  const {
    className,
    control,
    name,
    label,
    placeholder,
    InputLabelProps,
    inputProps,
    InputProps,
    required,
    readOnly,
    type,
    multiline,
    minRows,
    hidden,
    helperText,
    disabled,
    rules,
    defaultValue,
    ...restProps
  } = props;

  const {
    field: { value, onBlur, onChange, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  let { transform } = props;

  if (type === "number") {
    transform = {
      input: (value) => value,
      output: (e) => {
        const output = e.target.value;
        return Number.isNaN(output) ? 0 : Number(output);
      },
    };
  }

  return (
    <Box className={className}>
      <TextField
        fullWidth
        type={type === "number" ? "text" : type}
        label={label}
        placeholder={placeholder}
        onChange={(e) => onChange(transform.output(e))}
        onBlur={onBlur}
        value={transform.input(value)}
        inputRef={ref}
        multiline={multiline}
        minRows={minRows}
        disabled={disabled}
        error={!!error}
        helperText={error && error.message}
        InputLabelProps={{
          shrink: placeholder ? true : undefined,
          required,
          ...InputLabelProps,
        }}
        inputProps={{
          readOnly,
          ...inputProps,
        }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        InputProps={{
          ...InputProps,
        }}
        {...restProps}
      />
      {helperText && (
        <FormHelperText className="text-10">{helperText}</FormHelperText>
      )}
    </Box>
  );
};

CoreInput.defaultProps = {
  className: null,
  label: null,
  placeholder: null,
  transform: {
    input: (value) => value,
    output: (e) => e,
  },
  InputLabelProps: null,
  inputProps: null,
  InputProps: null,
  required: false,
  type: "text",
  multiline: false,
  minRows: 5,
  disabled: false,
  // allowTranslation: false
};

CoreInput.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  transform: PropTypes.object,
  InputLabelProps: PropTypes.object,
  inputProps: PropTypes.object,
  InputProps: PropTypes.object,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
  multiline: PropTypes.bool,
  minRows: PropTypes.number,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  helperText: PropTypes.any,
  rules: PropTypes.object,
  // allowTranslation: PropTypes.bool
};

export default React.memo(CoreInput);
