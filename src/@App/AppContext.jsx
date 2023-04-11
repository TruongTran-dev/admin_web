/*
 * Created Date: 07-10-2022, 9:59:12 am
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
import { createContext, useContext } from 'react'

const AppContext = createContext({})

export const useAppContext = () => useContext(AppContext)

export default AppContext
