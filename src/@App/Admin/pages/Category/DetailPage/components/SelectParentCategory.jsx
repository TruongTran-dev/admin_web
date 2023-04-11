import React, { useCallback } from "react";
import { categorySerivce } from "../../../../services/categoryService";
import CoreAutocomplete from "../../../../../../@Core/components/Input/CoreAutocomplete";
import { errorMsg } from "../../../../../../@Core/helper/Message";

const SelectParentCategory = (props) => {
  const { control, name, ...restProps } = props;

  const fetchParentCategory = useCallback(async () => {
    try {
      const res = await categorySerivce.list({
        size: 1000,
        parentId: 0,
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
      fetchOptions={fetchParentCategory}
      {...restProps}
    />
  );
};

// SelectParentCategory.defaultProps = {}

// SelectParentCategory.propTypes = {}

export default React.memo(SelectParentCategory);
