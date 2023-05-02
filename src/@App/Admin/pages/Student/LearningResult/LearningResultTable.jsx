import React from "react";
import CoreTable, {
  columnHelper,
} from "../../../../../@Core/components/Table/CoreTable";
import { useMemo } from "react";
import CoreInput from "../../../../../@Core/components/Input/CoreInput";
import { useForm } from "react-hook-form";
// import PropTypes from 'prop-types'

const LearningResultTable = (props) => {
  const { loading, learningResult = [] } = props;
  const { control } = useForm({});

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("subjectName", {
        cell: (info) => info.getValue(),
        header: "Môn",
      }),
      columnHelper.accessor("oralTestScore", {
        cell: (info) => (
          <CoreInput
            control={control}
            name="abc"
            size="small"
            className="w-60"
          />
        ),
        header: "Điểm KT miệng",
      }),
      columnHelper.accessor("m15TestScore", {
        cell: (info) => info.getValue() ?? "-",
        header: "Điểm KT 15p",
      }),
      columnHelper.accessor("m45TestScore", {
        cell: (info) => info.getValue() ?? "-",
        header: "Điểm KT 1 tiết",
      }),
      columnHelper.accessor("semesterTestScore", {
        cell: (info) => info.getValue() ?? "-",
        header: "Điểm KT hki",
      }),
      columnHelper.accessor("semesterSummaryScore", {
        cell: (info) => info.getValue() ?? "-",
        header: "Điểm TB hki",
      }),
    ];
  }, []);

  return (
    <CoreTable data={learningResult} loading={loading} columns={columns} />
  );
};

// LearningResultTable.defaultProps = {}

// LearningResultTable.propTypes = {}

export default React.memo(LearningResultTable);
