/*
 * Created Date: 10-10-2022, 10:43:11 pm
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
import { useEffect } from "react";
import * as Yup from "yup";

export { yupResolver } from "@hookform/resolvers/yup";

const REGEX = {
  PASSWORD:
    /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  PHONE: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
};

Yup.addMethod(
  Yup.string,
  "password",
  function (errorMessage = "Mật khẩu không hợp lệ") {
    return this.matches(REGEX.PASSWORD, {
      message: errorMessage,
      excludeEmptyString: true,
    });
  }
);

Yup.addMethod(
  Yup.string,
  "email",
  function (errorMessage = "Không đúng định dạng email") {
    return this.matches(REGEX.EMAIL, {
      message: errorMessage,
      excludeEmptyString: true,
    });
  }
);

Yup.addMethod(
  Yup.string,
  "phone",
  function (errorMessage = "Số điện thoại sai định dạng") {
    return this.matches(REGEX.PHONE, {
      message: errorMessage,
      excludeEmptyString: true,
    });
  }
);

export const useYupChangeLocale = () => {
  useEffect(() => {
    Yup.setLocale({
      mixed: {
        required: "Đây là trường bắt buộc",
      },
      string: {
        required: "Đây là trường bắt buộc",
        max: ({ max }) => `Tối đa ${max} ký tự`,
        min: ({ min }) => `Tối thiểu ${min} ký tự`,
      },
      array: {
        min: "Đây là trường bắt buộc",
      },
      number: {
        required: "Đây là trường bắt buộc",
        min: ({ min }) => `Không được phép nhỏ hơn ${min}`,
        max: ({ max }) => `Không được phép lơn hơn ${max}`,
      },
      date: {
        typeError: "Ngày không hợp lệ",
      },
    });
  }, []);
};

export default Yup;
