import {
  Autocomplete,
  CircularProgress,
  FormHelperText,
  TextField,
} from "@mui/material";
import { useRequest } from "ahooks";
import { find, get, isObject, map } from "lodash";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useMemo } from "react";
import { Controller } from "react-hook-form";

const CoreAutocomplete = ({
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
  fetchOptions,
  filter,
  valuePath,
  labelPath,
  loading,
  isCacheOption,
  returnValueType,
  multiple,
  disabled,
  isCacheKey,
  cacheKey,
  helperText,
  isCreateable,
  AutoCompleteClassName,
  rules,
  ...restProps
}) => {
  const {
    data: fetchedOptions = options,
    run: handleFetchOptions,
    loading: fetching,
  } = useRequest(fetchOptions, {
    manual: true,
  });

  const filterdOptions = useMemo(() => {
    if (!fetchedOptions) return options;

    if (filter) return filter(fetchedOptions);

    return fetchedOptions;
  }, [fetchedOptions, filter]);

  useEffect(() => {
    if (fetchOptions && !disabled && !readOnly) {
      if (isCacheOption) {
        if (!checkHasCurrentOptions()) {
          handleFetchOptions();
        }
      } else {
        handleFetchOptions();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchOptions, readOnly, disabled]);

  const getValueOption = useCallback(
    (value) => {
      if (multiple) {
        if (isCreateable) {
          return value;
        }
        const values = map(value, (v) => {
          if (!isObject(v)) {
            const option =
              find(filterdOptions, (item) => {
                return get(item, valuePath) === v;
              }) ?? null;
            return option;
          }
          return v;
        }).filter(Boolean);
        return values;
      }

      if (returnValueType === "enum") {
        return (
          find(filterdOptions, (item) => get(item, valuePath) === value) ?? null
        );
      }

      return value;
    },
    [filterdOptions]
  );

  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => {
          return (
            <Autocomplete
              className={AutoCompleteClassName}
              multiple={multiple}
              isOptionEqualToValue={(option, value) => {
                if (value instanceof Object) {
                  return get(option, valuePath) === get(value, valuePath);
                }
                return get(option, valuePath) === value;
              }}
              getOptionLabel={(option) => {
                return get(option, labelPath) ?? "";
              }}
              loading={loading || fetching}
              options={filterdOptions}
              noOptionsText="Không có lựa chọn nào"
              disabled={disabled}
              onChange={(_, value) => {
                if (value === null) {
                  return onChange(null);
                }
                return returnValueType === "enum"
                  ? onChange(
                      multiple
                        ? value.map((v) => get(v, valuePath))
                        : get(value, valuePath)
                    )
                  : onChange(value);
              }}
              onBlur={onBlur}
              // onInputChange={(e, newInput) => console.log('============= newInput', newInput)}
              value={getValueOption(value)}
              renderOption={(props, option) => (
                <li {...props} key={option[valuePath]}>
                  {get(option, labelPath)}
                </li>
              )}
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    label={label}
                    placeholder={placeholder || `Chọn ${label}`}
                    inputRef={ref}
                    error={!!error}
                    helperText={error && error.message}
                    InputLabelProps={{
                      ...params.InputLabelProps,
                      shrink: true,
                      required,
                      ...InputLabelProps,
                    }}
                    inputProps={{
                      ...params.inputProps,
                      readOnly,
                      ...inputProps,
                    }}
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loading || fetching ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                      ...InputProps,
                    }}
                  />
                  {helperText && <FormHelperText>{helperText}</FormHelperText>}
                </>
              )}
              {...restProps}
            />
          );
        }}
        rules={rules}
      />
    </div>
  );
};

CoreAutocomplete.defaultProps = {
  className: null,
  options: [],
  label: null,
  placeholder: null,
  InputLabelProps: null,
  inputProps: null,
  InputProps: null,
  required: false,
  readOnly: false,
  fetchOptions: undefined,
  filter: undefined,
  valuePath: "value",
  labelPath: "label",
  isCacheOption: false,
  returnValueType: "option",
  isCacheKey: true,
  cacheKey: undefined,
  isCreateable: false,
};

CoreAutocomplete.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  InputLabelProps: PropTypes.object,
  inputProps: PropTypes.object,
  InputProps: PropTypes.object,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  fetchOptions: PropTypes.func,
  filter: PropTypes.func,
  disableClearable: PropTypes.bool,
  disabled: PropTypes.bool,
  isCacheOption: PropTypes.bool,
  valuePath: PropTypes.string,
  labelPath: PropTypes.string,
  returnValueType: PropTypes.oneOf(["option", "enum"]),
  multiple: PropTypes.bool,
  isCacheKey: PropTypes.bool,
  cacheKey: PropTypes.string,
  helperText: PropTypes.any,
  filterOptions: PropTypes.func,
  getOptionLabel: PropTypes.func,
  isCreateable: PropTypes.bool,
  AutoCompleteClassName: PropTypes.string,
  rules: PropTypes.object,
};

export default React.memo(CoreAutocomplete);
