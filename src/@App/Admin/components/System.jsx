/*
 * Created Date: 16-08-2022, 12:30:17 am
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

export const showLoadingPage = () => {
  document.getElementById("loading-page").style.display = "block";
};

export const hideLoadingPage = (timeout = 0) => {
  setTimeout(() => {
    if (document.getElementById("loading-page"))
      document.getElementById("loading-page").style.display = "none";
  }, timeout);
};
