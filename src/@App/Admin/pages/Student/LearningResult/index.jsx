import React from "react";
import { useLearningResultDetail } from "./hooks/useLearningResultDetail";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import moment from "moment";
import LearningResultTable from "./LearningResultTable";
import CoreAutocomplete from "../../../../../@Core/components/Input/CoreAutocomplete";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
// import PropTypes from 'prop-types'

const LearnignResult = (props) => {
  const {
    learningResult,
    loading,
    student,
    loadingStudent,
    control,
    getLearningResult,
    time,
  } = useLearningResultDetail();

  const navigate = useNavigate();
  return loadingStudent ? (
    <Box className="mt-40 text-center">
      <CircularProgress />
    </Box>
  ) : (
    <Card className="p-20">
      <Tooltip title="Trở về">
        <IconButton color="error" onClick={() => navigate("/teacher/student")}>
          <BiArrowBack />
        </IconButton>
      </Tooltip>
      <Box className="flex flex-nowrap mb-20">
        <Box className="w-1/4 border-1 p-12 text-[14px]">
          <Box>Nhập điểm cho:</Box>
          <Box className="flex">
            <Box className="w-1/3 text-[14px] font-bold">Mã HS:</Box>
            <Box className="w-2/3">{student?.code}</Box>
          </Box>
          <Box className="flex">
            <Box className="w-1/3 text-[14px] font-bold">Tên HS:</Box>
            <Box className="w-2/3">{student?.name}</Box>
          </Box>
          <Box className="flex">
            <Box className="w-1/3 text-[14px] font-bold">Ngày sinh:</Box>
            <Box className="w-2/3">
              {moment(student?.dateOfBirth).format("DD-MM-YYYY")}
            </Box>
          </Box>
          <Box className="flex">
            <Box className="w-1/3 text-[14px] font-bold">Lớp:</Box>
            <Box className="w-2/3">{student?.classResponse?.name}</Box>
          </Box>
        </Box>
        <Box className="w-3/4 ml-20">
          <CoreAutocomplete
            control={control}
            name="time"
            label="Thời gian"
            className="w-[200px] ml-12"
            options={[
              {
                label: "Học kì 1 2022-2023",
                time: {
                  year: "2022-2023",
                  term: 1,
                },
                value: "Học kì 1 2022-2023",
              },
              {
                label: "Học kì 2 2022-2023",
                time: {
                  year: "2022-2023",
                  term: 2,
                },
                value: "Học kì 2 2022-2023",
              },
              {
                label: "Học kì 1 2023-2024",
                time: {
                  year: "2023-2024",
                  term: 1,
                },
                value: "Học kì 1 2023-2024",
              },
              {
                label: "Học kì 2 2023-2024",
                time: {
                  year: "2023-2024",
                  term: 2,
                },
                value: "Học kì 2 2023-2024",
              },
            ]}
            size="small"
          />
        </Box>
      </Box>
      {loading ? (
        <Box className="mt-20 text-center">
          <CircularProgress />
        </Box>
      ) : (
        <LearningResultTable
          loading={loading}
          learningResult={learningResult}
          getLearningResult={getLearningResult}
          time={time}
        />
      )}
    </Card>
  );
};

// LearnignResult.defaultProps = {}

// LearnignResult.propTypes = {}

export default React.memo(LearnignResult);
