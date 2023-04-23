import React, { useCallback } from "react";
import { classService } from "../../../../services/classService";
import { errorMsg } from "../../../../../../@Core/helper/Message";
import CoreAutocomplete from "../../../../../../@Core/components/Input/CoreAutocomplete";

const SelectClass = (props) => {
  const { control, name, ...restProps } = props;

  const fetchClass = useCallback(async () => {
    try {
      const res = await classService.list({
        size: 1000,
      });
      return res?.content;
    } catch (error) {
      errorMsg(error);
    }
  }, []);

  return (
    <CoreAutocomplete
      control={control}
      name={name}
      valuePath="id"
      labelPath="name"
      fetchOptions={fetchClass}
      {...restProps}
    />
  );
};

// SelectClass.defaultProps = {}

// SelectClass.propTypes = {}

export default React.memo(SelectClass);
