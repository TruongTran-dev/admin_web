import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormHelperText, TextField, Typography } from "@mui/material";
import { format, formatISO, isValid } from "date-fns";
import enLocale from "date-fns/locale/en-US";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import dayjs from "dayjs";

const CoreDatepickerV2 = (props) => {
  const {
    className,
    control,
    name,
    options,
    label,
    placeholder,
    InputLabelProps,
    inputProps,
    InputProps,
    shrink,
    required,
    readOnly,
    maxDate,
    helperText,
    size,
    isFormatISO,
    ...restProps
  } = props;

  return (
    <div className={className}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          control={control}
          name={name}
          render={({
            field: { onChange, onBlur, value, ref },
            fieldState: { error },
          }) => (
            <>
              <DatePicker
                label={label}
                onChange={onChange}
                value={value ? dayjs(value) : null}
                inputRef={ref}
                // mask="____/__/__"
                format="DD/MM/YYYY"
                //   readOnly={true}
                // maxDate={maxDate}

                minDate={dayjs("1950-01-01")}
                maxDate={dayjs("2050-01-01")}
                //   renderInput={(params) => (
                //     <>
                //       <TextField
                //         {...params}
                //         fullWidth
                //         onBlur={onBlur}
                //         size={size}
                //         error={!!error}
                //         helperText={error && error.message}
                //         InputLabelProps={{
                //           ...params.InputLabelProps,
                //           shrink,
                //           required,
                //           ...InputLabelProps,
                //         }}
                //         inputProps={{
                //           ...params.inputProps,
                //           ...inputProps,
                //           readOnly,
                //         }}
                //         // eslint-disable-next-line react/jsx-no-duplicate-props
                //         InputProps={{
                //           ...params.InputProps,
                //           ...InputProps,
                //         }}
                //       />
                //       {helperText && <FormHelperText>{helperText}</FormHelperText>}
                //     </>
                //   )}
                {...restProps}
              />
              {error && (
                <Typography className="text-[#E50000] text-[1.2rem]">
                  {error?.message}
                </Typography>
              )}
            </>
          )}
        />
      </LocalizationProvider>
    </div>
  );
};

CoreDatepickerV2.defaultProps = {
  className: null,
  label: null,
  placeholder: null,
  InputLabelProps: null,
  inputProps: null,
  InputProps: null,
  shrink: true,
  required: false,
  readOnly: false,
  maxDate: null,
  isFormatISO: false,
};

CoreDatepickerV2.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  InputLabelProps: PropTypes.object,
  inputProps: PropTypes.object,
  InputProps: PropTypes.object,
  shrink: PropTypes.bool,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  maxDate: PropTypes.any,
  minDate: PropTypes.any,
  disabled: PropTypes.bool,
  helperText: PropTypes.any,
  isFormatISO: PropTypes.bool,
};

export default React.memo(CoreDatepickerV2);
