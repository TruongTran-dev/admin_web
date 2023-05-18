import React from "react";
import CoreTable, {
  columnHelper,
} from "../../../../../@Core/components/Table/CoreTable";
import { useMemo } from "react";
import CoreInput from "../../../../../@Core/components/Input/CoreInput";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
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

  console.log("============= watch()", watch());

  const result = watch("result");

  return (
    <>
      <Table>
        <colgroup>
          <col className="w-1/7" />
          <col className="w-1/7" />
          <col className="w-1/7" />
          <col className="w-1/7" />
          <col className="w-1/7" />
          <col className="w-1/7" />
          <col className="w-1/7" />
        </colgroup>
        <TableHead className="bg-[#FFF3E2]">
          <TableCell className="font-bold">Môn</TableCell>
          <TableCell className="font-bold">Điểm KT miệng </TableCell>
          <TableCell className="font-bold">Điểm KT 15p </TableCell>
          <TableCell className="font-bold">Điểm KT 1 tiết </TableCell>
          <TableCell className="font-bold">Điểm KT hki </TableCell>
          <TableCell className="font-bold">Điểm TB môn </TableCell>
          <TableCell className="font-bold">Hành động</TableCell>
        </TableHead>
        <TableBody>
          {result?.map((item, index) => {
            const findResult = result?.find((i) => i?.id === item?.id);
            const semesterSummaryScore = () => {
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
            };

            return (
              <TableRow key={item?.id}>
                <TableCell>{item?.subjectName}</TableCell>
                <TableCell>
                  <CoreInput
                    control={control}
                    name={`result[${index}].oralTestScore`}
                    size="small"
                    className="w-60"
                    type="number"
                    rules={{
                      validate: {
                        min: (v) => {
                          console.log("============= v", v);
                          if (v < 0) {
                            return `Phải lớn hơn hoặc bằng 0`;
                          }
                        },
                      },
                    }}
                  />
                </TableCell>
                <TableCell>
                  <CoreInput
                    control={control}
                    name={`result[${index}].m15TestScore`}
                    size="small"
                    className="w-60"
                    type="number"
                  />
                </TableCell>
                <TableCell>
                  <CoreInput
                    control={control}
                    name={`result[${index}].m45TestScore`}
                    size="small"
                    className="w-60"
                    type="number"
                  />
                </TableCell>
                <TableCell>
                  <CoreInput
                    control={control}
                    name={`result[${index}].semesterTestScore`}
                    size="small"
                    className="w-60"
                    type="number"
                  />
                </TableCell>
                <TableCell>{semesterSummaryScore()}</TableCell>
                <TableCell>
                  <Button
                    onClick={async () => {
                      const findResult = result?.find((i) => i?.id === item.id);
                      try {
                        await studentService.editLearningResult(findResult);
                        successMsg(
                          `Lưu điểm môn học ${item?.subjectName} thành công`
                        );
                      } catch (error) {
                        errorMsg("Lưu điểm thất bại");
                      }
                    }}
                  >
                    Lưu
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* <CoreTable data={learningResult} loading={loading} columns={columns} /> */}
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
