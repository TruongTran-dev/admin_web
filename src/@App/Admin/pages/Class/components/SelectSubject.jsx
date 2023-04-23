import React, { useCallback } from "react";
import { subjectService } from "../../../services/subjectService";
import { errorMsg } from "../../../../../@Core/helper/Message";
import CoreAutocomplete from "../../../../../@Core/components/Input/CoreAutocomplete";

const SelectSubject = (props) => {
  const { control, name, ...restProps } = props;

  const fetchSubject = useCallback(async () => {
    try {
      const res = await subjectService.list({
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
      fetchOptions={fetchSubject}
      {...restProps}
    />
  );
};

// SelectSubject.defaultProps = {}

// SelectSubject.propTypes = {}

export default React.memo(SelectSubject);
