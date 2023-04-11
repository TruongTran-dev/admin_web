/*
 * Created Date: 12-10-2022, 4:26:51 pm
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

import { Icon, InputAdornment, TextField } from '@mui/material'
import React from 'react'
// import PropTypes from 'prop-types'

const FormInputSearch = ({ id, label = 'Search', placeholder = '', size = 'small', className, ...resProps }) => {
	return (
		<TextField
			id={id}
			label={label}
			placeholder={placeholder}
			variant="outlined"
			className={className}
			size={size}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<Icon>search</Icon>
					</InputAdornment>
				)
			}}
			{...resProps}
		/>
	)
}

//FormInputSearch.defaultProps = {}

//FormInputSearch.propTypes = {}

export default React.memo(FormInputSearch)
