import { useDebounce, useUpdateEffect } from "ahooks";
import React from "react";
import { useForm } from "react-hook-form";
import CoreInput from "../../../../../../@Core/components/Input/CoreInput";
import { useAdminPageContext } from "../../../../components/Provider/AdminPageProvider";
import CoreAutocomplete from "../../../../../../@Core/components/Input/CoreAutocomplete";
// import PropTypes from 'prop-types'

const CategoryFilter = (props) => {
  const { getCategory } = useAdminPageContext();
  const { control, watch } = useForm({
    defaultValues: {
      search: "",
      type: null,
    },
  });

  const search = useDebounce(watch("search"), 500);
  const type = watch("type");

  useUpdateEffect(() => {
    getCategory({ search });
  }, [search, type]);
  return (
    <>
      <CoreInput
        control={control}
        name="search"
        label="Tìm kiếm"
        placeholder="Tìm kiếm user"
        className="w-[200px] mx-8"
        size="small"
      />
      <CoreAutocomplete
        control={control}
        name="type"
        label="Type"
        placeholder="Chọn type"
        className="w-[200px]"
        size="small"
        returnValueType="enum"
        options={[
          { value: "EXPENSE", label: "Chi tiêu" },
          { value: "INCOME", label: "Thu nhập" },
        ]}
      />
    </>
  );
};

// CategoryFilter.defaultProps = {}

// CategoryFilter.propTypes = {}

export default React.memo(CategoryFilter);
