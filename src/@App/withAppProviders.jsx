/*
 * Created Date: 03-10-2021, 2:25:04 pm
 * Author: Peter
 * Email: phantrung696@gmail.com
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * Copyright (c) 2021 VNE E-COMMERCE, Inc
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 */

// import createGenerateClassName from '@mui/styles/createGenerateClassName';
// import jssPreset from '@mui/styles/jssPreset';
// import { create } from 'jss';
// import jssExtend from 'jss-plugin-extend';
// import rtl from 'jss-rtl';
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { StyledEngineProvider } from '@mui/material/styles'

// import viLocale from 'date-fns/locale'

import { useState } from 'react'
import AppContext from './AppContext'

const withAppProviders = Component => props => {
	const WrapperComponent = () => {
		const [error, setError] = useState(false)
		return (
			<AppContext.Provider
				value={{
					error,
					setError
				}}
			>
				<StyledEngineProvider injectFirst>
					<Component {...props} />
				</StyledEngineProvider>
			</AppContext.Provider>
		)
	}

	return WrapperComponent
}

export default withAppProviders
