import { Box, CircularProgress, FormHelperText } from "@mui/material";
import React, { useRef, useState } from "react";
import { newsSerivce } from "../../../../services/newsService";
import { errorMsg, successMsg } from "../../../../../../@Core/helper/Message";
import { BiImageAdd } from "react-icons/bi";
import { useController, useFormContext } from "react-hook-form";

// import PropTypes from 'prop-types'

const UploadImage = (props) => {
  const { name } = props;
  const { control, watch, setValue } = useFormContext();
  const {
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  const inputFileRef = useRef(null);
  const [urlImage, setUrlImage] = useState(watch(name) ?? "");
  const [loading, setLoading] = useState(false);

  const handleAddFile = () => {
    inputFileRef.current.click();
  };

  const handleUploadFile = async (file) => {
    setLoading(true);
    try {
      const res = await newsSerivce.uploadImage(file);
      setUrlImage(res);
      setValue(name, res);

      successMsg("Upload ảnh thành công");
    } catch (e) {
      errorMsg("Upload ảnh thất bại");
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
        <Box className="border-1 w-[200px] aspect-video flex w-full flex-col justify-center cursor-pointer items-center hover:opacity-80">
          <CircularProgress />
        </Box>
      );
    }
    return urlImage ? (
      <img src={urlImage} className="mx-auto w-[200px]" />
    ) : (
      <Box
        sx={{ border: "1px solid #ccc" }}
        className="border-1 w-[200px] aspect-video flex w-full flex-col justify-center items-center hover:opacity-80 mx-auto"
      >
        {loading ? <CircularProgress /> : <BiImageAdd size={60} />}
      </Box>
    );
  };
  return (
    <>
      <Box
        className="w-full mx-auto mb-12 cursor-pointer"
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
      {error && (
        <FormHelperText
          sx={{ fontSize: "12px" }}
          className="my-2 italic ml-5 text-[#E50000]"
        >
          {error?.message}
        </FormHelperText>
      )}
    </>
  );
};

// UploadImage.defaultProps = {}

// UploadImage.propTypes = {}

export default React.memo(UploadImage);
