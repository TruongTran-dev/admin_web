import { useDebounce, useUpdateEffect } from "ahooks";
import React from "react";
import { useForm } from "react-hook-form";
import CoreInput from "../../../../../../@Core/components/Input/CoreInput";
import { useAdminPageContext } from "../../../../components/Provider/AdminPageProvider";
import SelectClass from "../../DetailPage/components/SelectClass";
// import PropTypes from 'prop-types'

const StudentFilterTable = (props) => {
  const { tableHandler } = useAdminPageContext();
  const { control, watch } = useForm({
    defaultValues: {
      search: "",
      classId: null,
    },
  });

  const search = useDebounce(watch("search"), 500);

  useUpdateEffect(() => {
    tableHandler.handleFetchData({ search, classId: watch("classId") });
  }, [search, watch("classId")]);
  return (
    <>
      <CoreInput
        control={control}
        name="search"
        label="Tìm kiếm"
        placeholder="Tìm kiếm học sinh"
        className="w-[200px] ml-8"
        size="small"
      />
      <SelectClass
        control={control}
        name="classId"
        label="Lớp"
        className="w-[200px] ml-12"
        returnValueType="enum"
        size="small"
      />
    </>
  );
};

// StudentFilterTable.defaultProps = {}

// StudentFilterTable.propTypes = {}

export default React.memo(StudentFilterTable);
