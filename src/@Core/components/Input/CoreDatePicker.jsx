/*
 * Created Date: 12-10-2022, 10:11:22 pm
 * Author: Peter
 * Email: phantrung696@gmail.com
 * -----
 * Last Modified:
 * Modified By: haitran
 * -----
 * Copyright (c) 2022 PROS+ Group , Inc
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 */

import { FormHelperText, Icon, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import clsx from "clsx";
import moment from "moment";
import React, { forwardRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useController } from "react-hook-form";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CloseIcon from "@mui/icons-material/Close";
// import PropTypes from 'prop-types'

const CoreDatePicker = ({
  className = "",
  label = "",
  control,
  name = "",
  defaultValue,
  rules,
  required = false,
  helperText,
  placeholder = "",
  size = "",
}) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    control,
    name,
    defaultValue,
    rules,
  });

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <TextField
      fullWidth
      variant="outlined"
      required={required}
      label={label}
      value={value ? moment(value).format("YYYY/MM/DD") : null}
      // onClick={onClick}
      InputProps={{
        endAdornment: (
          <>
            {value ? (
              <Icon
                onClick={() => onChange(null)}
                fontSize="small"
                className="cursor-pointer rounded-full mr-8"
              >
                <CloseIcon />
              </Icon>
            ) : null}
            <Icon className="cursor-pointer" onClick={onClick}>
              <CalendarMonthIcon />
            </Icon>
          </>
        ),
      }}
      ref={ref}
      error={!!error}
      inputProps={{
        readOnly: true,
      }}
      size={size}
      placeholder={placeholder}
    />
  ));

  return (
    <Box
      className={className}
      sx={{
        "& .react-datepicker": {
          fontSize: "1.1rem",
          "& .react-datepicker__month": {
            margin: 1,
          },
        },
      }}
    >
      <ReactDatePicker
        selected={value}
        onChange={(date) => onChange(date)}
        customInput={<CustomInput />}
        withPortal
        ref={ref}
        onCalendarClose={onBlur}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && error.message && (
        <FormHelperText error>{error.message}</FormHelperText>
      )}
    </Box>
  );
};

//CoreDatePicker.defaultProps = {}

//CoreDatePicker.propTypes = {}

export default React.memo(CoreDatePicker);
