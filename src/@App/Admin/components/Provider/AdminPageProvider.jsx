/*
 * Created Date: 12-10-2022, 3:18:29 pm
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

import React, { useContext } from "react";
// import PropTypes from 'prop-types'
const AdminPageContext = React.createContext();

export const useAdminPageContext = () => useContext(AdminPageContext);

const AdminPageProvider = (props) => {
  return (
    <AdminPageContext.Provider value={props}>
      {props.children}
    </AdminPageContext.Provider>
  );
};

//AdminPageProvider.defaultProps = {}

//AdminPageProvider.propTypes = {}

export default React.memo(AdminPageProvider);
