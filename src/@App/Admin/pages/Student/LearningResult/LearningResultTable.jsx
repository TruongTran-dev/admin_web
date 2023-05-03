import React from "react";
import CoreTable, {
  columnHelper,
} from "../../../../../@Core/components/Table/CoreTable";
import { useMemo } from "react";
import CoreInput from "../../../../../@Core/components/Input/CoreInput";
import { useForm } from "react-hook-form";
import { Box, Button } from "@mui/material";
import { errorMsg, successMsg } from "../../../../../@Core/helper/Message";
import { studentService } from "../../../services/studentService";
import { useParams } from "react-router-dom";
// import PropTypes from 'prop-types'

const LearningResultTable = (props) => {
  const { loading, learningResult = [], getLearningResult, time } = props;
  const { id } = useParams();
  const { control, watch } = useForm({
    defaultValues: {
      result: learningResult,
    },
  });

  console.log("============= time", time);

  const result = watch("result");

  console.log("============= watch()", watch());

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("subjectName", {
        cell: (info) => info.getValue(),
        header: "Môn",
      }),
      columnHelper.accessor("oralTestScore", {
        cell: ({ row }) => {
          return (
            <CoreInput
              control={control}
              name={`result[${row.index}].oralTestScore`}
              size="small"
              className="w-60"
              type="number"
            />
          );
        },
        header: "Điểm KT miệng",
      }),
      columnHelper.accessor("m15TestScore", {
        cell: ({ row }) => {
          return (
            <CoreInput
              control={control}
              name={`result[${row.index}].m15TestScore`}
              size="small"
              className="w-60"
              type="number"
            />
          );
        },
        header: "Điểm KT 15p",
      }),
      columnHelper.accessor("m45TestScore", {
        cell: ({ row }) => {
          return (
            <CoreInput
              control={control}
              name={`result[${row.index}].m45TestScore`}
              size="small"
              className="w-60"
              type="number"
            />
          );
        },
        header: "Điểm KT 1 tiết",
      }),
      columnHelper.accessor("semesterTestScore", {
        cell: ({ row }) => {
          return (
            <CoreInput
              control={control}
              name={`result[${row.index}].semesterTestScore`}
              size="small"
              className="w-60"
              type="number"
            />
          );
        },
        header: "Điểm KT hki",
      }),
      columnHelper.accessor("semesterSummaryScore", {
        cell: ({ row }) => {
          const findResult = result?.find((i) => i?.id === row.original.id);
          console.log("============= findResult", findResult);
          if (row.original.semesterSummaryScore) {
            return row.original.semesterSummaryScore;
          }
          if (
            findResult?.oralTestScore &&
            findResult?.m15TestScore &&
            findResult?.m45TestScore &&
            findResult?.semesterTestScore
          ) {
            return (
              ((findResult?.oralTestScore + findResult?.m15TestScore) / 2 +
                2 * findResult?.m45TestScore +
                3 * findResult?.semesterTestScore) /
              6
            );
          }
          return "-";
        },
        header: "Điểm TB môn",
      }),
      columnHelper.accessor("action", {
        header: "Hành động",
        cell: ({ row }) => {
          const data = row.original;
          return (
            <div className="flex">
              <Button
                onClick={async () => {
                  const findResult = result?.find(
                    (i) => i?.id === row.original.id
                  );
                  try {
                    await studentService.editLearningResult(findResult);
                    successMsg(
                      `Lưu điểm môn học ${data?.subjectName} thành công`
                    );
                  } catch (error) {
                    errorMsg("Lưu điểm thất bại");
                  }
                }}
              >
                Lưu
              </Button>
            </div>
          );
        },
      }),
    ];
  }, [JSON.stringify(result)]);

  return (
    <>
      <CoreTable data={learningResult} loading={loading} columns={columns} />
      <Box className="text-center mt-20">
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            try {
              await studentService.calcLearningResult({
                studentId: id,
                semesterYear: time?.time?.year,
              });
              successMsg("Tính điểm tổng kết thành công");
            } catch (error) {
              errorMsg("Tính điểm tổng kết thất bại");
            }
          }}
        >
          Tính điểm TB học kì {time?.time?.term}
        </Button>
      </Box>
    </>
  );
};

// LearningResultTable.defaultProps = {}

// LearningResultTable.propTypes = {}

export default React.memo(LearningResultTable);
