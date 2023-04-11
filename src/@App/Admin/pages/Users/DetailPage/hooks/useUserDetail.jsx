import { useRequest } from "ahooks";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { userSerivce } from "../../../../services/userService";
// import PropTypes from 'prop-types'

export const useUserDetail = (props) => {
  const { id } = useParams();

  const isEdit = id !== "new";

  const {
    data: user,
    run: getUser,
    loading: loadingUser,
  } = useRequest(userSerivce.getDetailUser, {
    manual: true,
  });

  useEffect(() => {
    if (isEdit) {
      getUser(id);
    }
  }, []);
  return {
    isEdit,
    user,
    loadingUser,
  };
};
