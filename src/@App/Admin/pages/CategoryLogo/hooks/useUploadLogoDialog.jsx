import React, { useCallback, useState } from "react";
import CoreDialog from "../../../../../@Core/components/Dialog/CoreDialog";
import UploadLogoDialog from "../components/UploadLogoDialog";
// import PropTypes from 'prop-types'

export const useUploadLogoDialog = (props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderUploadLogoDialog = useCallback(() => {
    return (
      open && (
        <CoreDialog
          dialogTitle="Upload Logo"
          open={open}
          handleClose={handleClose}
          dialogContent={<UploadLogoDialog handleClose={handleClose} />}
        />
      )
    );
  }, [open]);
  return { handleOpen, renderUploadLogoDialog };
};
