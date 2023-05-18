import { useDebounce, useUpdateEffect } from "ahooks";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CoreInput from "../../../../../../@Core/components/Input/CoreInput";
import { useAdminPageContext } from "../../../../components/Provider/AdminPageProvider";
import SelectClass from "../../DetailPage/components/SelectClass";
import CoreAutocomplete from "../../../../../../@Core/components/Input/CoreAutocomplete";
// import PropTypes from 'prop-types'

const StudentFilterTable = (props) => {
  const { tableHandler, methodForm } = useAdminPageContext();
  const { control, watch } = methodForm;

  const search = useDebounce(watch("search"), 500);

  useEffect(() => {
    tableHandler.handleFetchData({
      search,
      classId: watch("classId"),
      semesterYear: watch("semesterYear"),
    });
  }, [search, watch("classId"), watch("semesterYear")]);
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
      <CoreAutocomplete
        control={control}
        name="semesterYear"
        label="Năm học"
        returnValueType="enum"
        disableClearable
        options={[
          { value: "2022-2023", label: "2022-2023" },
          { value: "2023-2024", label: "2023-2024" },
          { value: "2024-2025", label: "2024-2025" },
        ]}
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
