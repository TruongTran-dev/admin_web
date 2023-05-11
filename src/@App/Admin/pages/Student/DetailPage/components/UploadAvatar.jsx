import { Box, CircularProgress, FormHelperText } from "@mui/material";
import React, { useRef, useState } from "react";
import { newsSerivce } from "../../../../services/newsService";
import { errorMsg, successMsg } from "../../../../../../@Core/helper/Message";
import { BiImageAdd } from "react-icons/bi";
import { useController, useFormContext } from "react-hook-form";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../../../@Core/helper/firebase";

// import PropTypes from 'prop-types'

const UploadAvatar = (props) => {
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

  const handleChangeFile = (e) => {
    const file = e.target?.files?.[0];
    const fileRef = ref(storage, `images/image_user_${new Date().getTime()}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "stage_changed",
      (snapshort) => {
        setLoading(true);

        let progress =
          (snapshort.bytesTransferred / snapshort.totalBytes) * 100;
      },
      (error) => {
        errorMsg(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setUrlImage(downloadUrl);
          setValue(name, downloadUrl);
        });
        successMsg("Upload success");
        setLoading(false);
      }
    );
  };

  const renderImage = () => {
    if (loading) {
      return (
        <Box className="border-1 w-[200px] h-[200px] aspect-video flex flex-col rounded-full justify-center cursor-pointer items-center hover:opacity-80">
          <CircularProgress />
        </Box>
      );
    }
    return urlImage ? (
      <img
        src={urlImage}
        className="mx-auto w-[200px] h-[200px] rounded-full"
      />
    ) : (
      <Box
        sx={{ border: "1px solid #ccc" }}
        className="border-1 w-[200px] h-[200px] aspect-video flex flex-col justify-center rounded-full items-center hover:opacity-80 mx-auto"
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

// UploadAvatar.defaultProps = {}

// UploadAvatar.propTypes = {}

export default React.memo(UploadAvatar);
