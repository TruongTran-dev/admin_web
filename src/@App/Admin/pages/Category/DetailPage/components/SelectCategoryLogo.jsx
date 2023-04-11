import React, { useCallback } from "react";
import CoreAutocomplete from "../../../../../../@Core/components/Input/CoreAutocomplete";
import { errorMsg } from "../../../../../../@Core/helper/Message";
import { categoryLogoSerivce } from "../../../../services/logoCategoryService";

const SelectCategoryLogo = (props) => {
  const { control, name, ...restProps } = props;

  const fetchParentCategory = useCallback(async () => {
    try {
      const res = await categoryLogoSerivce.list({
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
      renderOption={(props, option) => (
        <li {...props}>
          <img
            src={option.fileUrl}
            style={{ width: "30px", height: "30px" }}
            className="rounded-full mr-2"
          />
          {option.fileName}
        </li>
      )}
      getOptionLabel={(option) => option.fileName}
      {...restProps}
    />
  );
};

// SelectCategoryLogo.defaultProps = {}

// SelectCategoryLogo.propTypes = {}

export default React.memo(SelectCategoryLogo);
