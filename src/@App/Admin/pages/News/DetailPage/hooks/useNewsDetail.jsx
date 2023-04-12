import { useRequest } from "ahooks";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { userSerivce } from "../../../../services/userService";
import { newsSerivce } from "../../../../services/newsService";
// import PropTypes from 'prop-types'

export const useNewsDetail = (props) => {
  const { id } = useParams();

  const isEdit = id !== "new";

  const {
    data: news,
    run: getNews,
    loading: loadingNews,
  } = useRequest(newsSerivce.getNewsDetail, {
    manual: true,
  });

  useEffect(() => {
    if (isEdit) {
      getNews(id);
    }
  }, []);
  return {
    isEdit,
    news,
    loadingNews,
  };
};
