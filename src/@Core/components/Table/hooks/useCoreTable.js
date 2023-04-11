/*
 * Created Date: 16-08-2022, 9:49:54 pm
 * Author: Peter
 * Email: phantrung696@gmail.com
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * Copyright (c) 2022 PT CORP, Inc
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 */

// import { DEFAULT_PAGE_SIZE } from '@App/core/constants'

import { useCallback, useEffect, useMemo } from "react";
import { DEFAULT_RESPONSE } from "../../../api/BaseService";
// import { useConfirm } from '../../Confirm/CoreConfirm'

let params = {
  size: 10,
};
const useCoreTable = (requestFetchData) => {
  const { data, loading, run } = requestFetchData;

  // const [queryUrl, setQueryUrl] = useUrlState()
  const handleFetchData = useCallback(
    (query) => {
      console.log("============= 123", 123);
      return run({
        ...params,
        ...query,
      });
    },
    [params]
  );

  return {
    ...data,
    data: data?.content ?? [],
    total: data?.totalRecord,
    pageIndex: data?.pageNumber ?? 1, //data?.current_page ? data?.current_page - 1 : 0,
    pageSize: data?.pageSize ?? 10,
    loading,
    handleFetchData,
  };
};

export default useCoreTable;
