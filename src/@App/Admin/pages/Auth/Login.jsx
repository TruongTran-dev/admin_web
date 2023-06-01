import Cookies from "js-cookie";
import { useRequest } from "ahooks";
import React, { useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { Box, Card, Icon, Paper, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import Yup from "../../../../@Core/helper/Yup";
import CoreInput from "../../../../@Core/components/Input/CoreInput";
import { ROUTER_ADMIN } from "../../configs/constants";
import { authService } from "../../services/authService";
import { errorMsg, successMsg } from "../../../../@Core/helper/Message";
import LoginIcon from "@mui/icons-material/Login";
import { hideLoadingPage, showLoadingPage } from "../../components/System";

const FontTitle = ({ variant = "h1", title = "" }) => {
  return (
    <Typography className="text-[30px]" variant={variant}>
      {title}
    </Typography>
  );
};

const Login = () => {
  const navigate = useNavigate();

  // // set XSRF-TOKEN to cookies
  // const {
  //   data: csrfData,
  //   run: getCSRFData,
  //   loading: loadingCSRFData,
  // } = useRequest(authService.csrf, {
  //   manual: true,
  // });

  // useEffect(() => {
  //   getCSRFData();
  // }, []);

  const renderColor = () => {
    return (
      <LoadingButton
        loading={isSubmitting}
        variant="contained"
        color="primary"
        className="text-18 py-8 px-20 rounded-4 bg-[#007bff] text-white mt-20"
        type="submit"
      >
        Đăng nhập
      </LoadingButton>
    );
  };
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(
      Yup.object({
        username: Yup.string().required().trim().min(3),
        password: Yup.string().required(),
      })
    ),
  });

  const onSubmit = handleSubmit(async (data) => {
    showLoadingPage();
    try {
      const res = await authService.login(data);

      await Cookies.set("ACCOUNT_INFO", JSON.stringify(res));
      await navigate(ROUTER_ADMIN.homePage);
      successMsg("Đăng nhập thành công");
    } catch (e) {
      errorMsg("Tên tài khoản hoặc mật khẩu không đúng");
      console.log("============= e", e);
    }
    hideLoadingPage();
  });

  const renderFormLogin = () => {
    return (
      <form onSubmit={onSubmit}>
        <CoreInput
          className="flex-col py-10"
          control={control}
          name="username"
          label="Tài khoản"
          labelStyle="mb-8"
          required
          showTextRequired={false}
          placeholder="Nhập tài khoản"
        />
        <CoreInput
          className="flex-col py-10"
          type="password"
          control={control}
          name="password"
          label="Mật khẩu"
          labelStyle="mb-8"
          required
          showTextRequired={false}
          placeholder="Nhập mật khẩu"
        />
        {renderColor()}
      </form>
    );
  };
  return (
    <div>
      <div className="flex justify-center pt-40">
        <Card className="w-2/3 flex p-24 text-center shadow-none">
          <Box className="w-1/2">
            <img src="https://static.vecteezy.com/system/resources/previews/005/879/539/original/cloud-computing-modern-flat-concept-for-web-banner-design-man-enters-password-and-login-to-access-cloud-storage-for-uploading-and-processing-files-illustration-with-isolated-people-scene-free-vector.jpg" />
          </Box>
          <Box className="w-1/2">
            <LoginIcon fontSize="large" color="secondary" />

            <Typography className="text-[30px] font-600">Login</Typography>
            {renderFormLogin()}
          </Box>
        </Card>
      </div>
    </div>
  );
};

export default Login;
