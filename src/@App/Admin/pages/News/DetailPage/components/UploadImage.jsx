import { Box, CircularProgress, FormHelperText } from "@mui/material";
import React, { useRef, useState } from "react";
import { errorMsg, successMsg } from "../../../../../../@Core/helper/Message";
import { BiImageAdd, BiVideo, BiVideoPlus } from "react-icons/bi";
import { useController, useFormContext } from "react-hook-form";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../../../@Core/helper/firebase";
import CoreRadioGroup from "../../../../../../@Core/components/Input/CoreRadioGroup";
import { useUpdateEffect } from "ahooks";

// import PropTypes from 'prop-types'

const UploadImage = (props) => {
  const { name, nameType } = props;
  const { control, watch, setValue } = useFormContext();
  const {
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  const typeMedia = watch(nameType);
  const inputFileRef = useRef(null);
  const [urlImage, setUrlImage] = useState(watch(name) ?? "");
  const [loading, setLoading] = useState(false);

  useUpdateEffect(() => {
    setValue(name, "");
    setUrlImage("");
  }, [typeMedia]);

  const handleAddFile = () => {
    inputFileRef.current.click();
  };

  const handleChangeFile = (e) => {
    const file = e.target?.files?.[0];
    const fileRef = ref(storage, `videos/${file?.name}`);
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
        <Box className="border-1 w-[200px] aspect-video flex w-full flex-col justify-center cursor-pointer items-center hover:opacity-80">
          <CircularProgress />
        </Box>
      );
    }
    return urlImage ? (
      typeMedia == 1 ? (
        <img src={urlImage} className="mx-auto w-[200px]" />
      ) : (
        <video src={urlImage} className="mx-auto w-[200px]" />
      )
    ) : (
      <Box
        sx={{ border: "1px solid #ccc" }}
        className="border-1 w-[200px] aspect-video flex w-full flex-col justify-center items-center hover:opacity-80 mx-auto"
      >
        {loading ? (
          <CircularProgress />
        ) : typeMedia == 1 ? (
          <BiImageAdd size={60} />
        ) : (
          <BiVideoPlus size={60} />
        )}
      </Box>
    );
  };
  return (
    <>
      <CoreRadioGroup
        control={control}
        name={nameType}
        options={[
          { value: 0, label: "Video" },
          { value: 1, label: "Ảnh" },
        ]}
        row
      />
      <Box
        className="w-full mx-auto mb-12 cursor-pointer"
        onClick={handleAddFile}
      >
        {renderImage()}
      </Box>
      <input
        ref={inputFileRef}
        accept={typeMedia == 1 ? "image/*" : "video/*"}
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
