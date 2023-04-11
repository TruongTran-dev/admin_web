import { useDebounce, useUpdateEffect } from "ahooks";
import React from "react";
import { useForm } from "react-hook-form";
import CoreInput from "../../../../../../@Core/components/Input/CoreInput";
import { useAdminPageContext } from "../../../../components/Provider/AdminPageProvider";
// import PropTypes from 'prop-types'

const UserFilterTable = (props) => {
  const { tableHandler } = useAdminPageContext();
  const { control, watch } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const search = useDebounce(watch("search"), 500);

  useUpdateEffect(() => {
    tableHandler.handleFetchData({ search });
  }, [search]);
  return (
    <CoreInput
      control={control}
      name="search"
      label="Tìm kiếm"
      placeholder="Tìm kiếm user"
      className="w-[200px] ml-8"
      size="small"
    />
  );
};

// UserFilterTable.defaultProps = {}

// UserFilterTable.propTypes = {}

export default React.memo(UserFilterTable);
