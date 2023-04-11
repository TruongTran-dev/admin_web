import { Box, CircularProgress } from "@mui/material";
import React, { useRef, useState } from "react";
import { useCoreTableContext } from "../../../../../@Core/components/Table/CoreTable";
import { categoryLogoSerivce } from "../../../services/logoCategoryService";
import { errorMsg, successMsg } from "../../../../../@Core/helper/Message";
import { BiImageAdd } from "react-icons/bi";
import { useAdminPageContext } from "../../../components/Provider/AdminPageProvider";
// import PropTypes from 'prop-types'

const UploadLogoDialog = (props) => {
  const { handleClose } = props;
  const { tableHandler } = useAdminPageContext();

  const inputFileRef = useRef(null);
  const [urlImage, setUrlImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddFile = () => {
    inputFileRef.current.click();
  };

  const handleUploadFile = async (file) => {
    setLoading(true);
    try {
      const res = await categoryLogoSerivce.uploadLogo(file);

      successMsg("Upload logo thành công");
      handleClose();
      tableHandler.handleFetchData();
      console.log("_______ res _______", res);
    } catch (e) {
      errorMsg(e?.errors?.message);
    }
    setLoading(false);
  };

  const handleChangeFile = (e) => {
    const file = e.target?.files?.[0];
    if (file && file?.size < 1048576) {
      handleUploadFile(file);
    } else {
      errorMsg("Quá dung lượng");
    }
  };

  const renderImage = () => {
    if (loading) {
      return (
        <Box className="border-1 h-[144px] flex w-full flex-col justify-center cursor-pointer items-center hover:opacity-80">
          <CircularProgress />
        </Box>
      );
    }
    return urlImage ? (
      <img src={urlImage} className="mx-auto" />
    ) : (
      <Box
        sx={{ border: "1px solid #ccc" }}
        className="border-1 h-[144px] flex w-full flex-col justify-center items-center hover:opacity-80 mx-auto"
      >
        {loading ? <CircularProgress /> : <BiImageAdd size={60} />}
      </Box>
    );
  };
  return (
    <>
      <Box
        className="w-full mx-auto mb-20 cursor-pointer sm:w-1/2"
        onClick={handleAddFile}
      >
        {renderImage()}
      </Box>
      <input
        ref={inputFileRef}
        accept="image/*"
        hidden
        type="file"
        onChange={handleChangeFile}
      />
    </>
  );
};

// UploadLogoDialog.defaultProps = {}

// UploadLogoDialog.propTypes = {}

export default React.memo(UploadLogoDialog);
