import React from "react";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import ClassProvider from "./ClassProvider";
import ClassTable from "./components/ClassTable";
import ClassForm from "./components/ClassForm";
// import PropTypes from 'prop-types'

const ListPage = (props) => {
  return (
    <ClassProvider>
      <Box className="flex">
        <Card className="w-1/3 mr-20 border-t-4 border-t-[#62CDFF]">
          <ClassForm />
        </Card>
        <Card className="w-2/3 border-t-4 border-t-[#62CDFF]">
          <CardHeader title="Danh sách môn học" />
          <CardContent>
            <ClassTable />
          </CardContent>
        </Card>
      </Box>
    </ClassProvider>
  );
};

// ListPage.defaultProps = {}

// ListPage.propTypes = {}

export default React.memo(ListPage);
