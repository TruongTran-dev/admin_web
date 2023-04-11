/*
 * Created Date: 06-10-2022, 9:55:04 pm
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

import { ThemeProvider } from '@mui/material/styles'

import React from 'react'

import defaultTheme from './defaultTheme'
// import PropTypes from 'prop-types'

const CoreAppTheme = props => {
	const theme = {
		...defaultTheme
	}
	return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
}

//CoreAppTheme.defaultProps = {}

//CoreAppTheme.propTypes = {}

export default React.memo(CoreAppTheme)
