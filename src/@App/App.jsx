/*
 * Created Date: 06-10-2022, 9:46:59 pm
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

import React from "react";
import CoreAppTheme from "../@Core/components/CoreAppTheme";
// import PropTypes from 'prop-types'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  useNavigate,
} from "react-router-dom";
import { appRouterConfig } from "./appConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { CoreConfirmProvider } from "../@Core/components/Confirm/CoreConfirm";
import { useYupChangeLocale } from "../@Core/helper/Yup";
const App = (props) => {
  useYupChangeLocale();

  return (
    <CoreAppTheme>
      <CoreConfirmProvider>
        <RouterProvider router={appRouterConfig} />
      </CoreConfirmProvider>
      <ToastContainer />
    </CoreAppTheme>
  );
};

//App.defaultProps = {}

//App.propTypes = {}

export default App;
