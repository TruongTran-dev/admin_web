import { useRequest } from "ahooks";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { userSerivce } from "../../../../services/userService";
import { categorySerivce } from "../../../../services/categoryService";
// import PropTypes from 'prop-types'

export const useCategoryDetail = (props) => {
  const { id } = useParams();

  const isEdit = id !== "new";

  const {
    data: category,
    run: getCategory,
    loading: loadingCategory,
  } = useRequest(categorySerivce.find, {
    manual: true,
  });

  useEffect(() => {
    if (isEdit) {
      getCategory(id);
    }
  }, []);
  return {
    isEdit,
    category,
    loadingCategory,
  };
};
