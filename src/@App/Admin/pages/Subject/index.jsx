import React from "react";
import SubjectProvider from "./SubjectProvider";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import SubjectForm from "./components/SubjectForm";
import SubjectTable from "./components/SubjectTable";
// import PropTypes from 'prop-types'

const ListPage = (props) => {
  return (
    <SubjectProvider>
      <Box className="flex">
        <Card className="w-1/3 mr-20 border-t-4 border-t-[#62CDFF]">
          <SubjectForm />
        </Card>
        <Card className="w-2/3 border-t-4 border-t-[#62CDFF]">
          <CardHeader title="Danh sách môn học" />
          <CardContent>
            <SubjectTable />
          </CardContent>
        </Card>
      </Box>
    </SubjectProvider>
  );
};

// ListPage.defaultProps = {}

// ListPage.propTypes = {}

export default React.memo(ListPage);
