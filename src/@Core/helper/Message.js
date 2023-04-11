/*
 * Created Date: 11-10-2022, 9:00:54 pm
 * Author: Peter
 * Email: phantrung696@gmail.com
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * Copyright (c) 2022 PROS+ Group , Inc
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 */

import { toast } from "react-toastify";

/*
 * Created Date: 16-08-2022, 12:17:05 am
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
export const successMsg = (msg) => {
  if (msg) toast.success(msg);
};

export const errorMsg = (error, defaultMsg = "データの取得に失敗") => {
  if (error instanceof Error) {
    console.log("============= error.message", error.message);
    toast.error(error.message);
    return false;
  } else if (typeof error === "string") {
    // NotificationManager.error(msg)
    toast.error(error);
  } else {
    toast.error(defaultMsg);
  }
};
