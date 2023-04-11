/*
 * Created Date: 12-10-2022, 4:22:01 pm
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

import { Autocomplete, FormHelperText, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useController } from 'react-hook-form'
import PropTypes from 'prop-types'

const FormAutocomplete = ({
	id,
	options = [],
	label = '',
	placeholder,
	name,
	control,
	rules,
	helperText,
	className,
	sx = {},
	...resProps
}) => {
	const {
		field: { onChange, onBlur, value, ref },
		fieldState: { error }
	} = useController({
		name,
		control,
		rules
	})

	return (
		<Box className={className} sx={sx}>
			<Autocomplete
				id={id}
				options={options}
				value={value}
				onChange={(e, value) => onChange(value)}
				onBlur={onBlur}
				renderInput={params => (
					<>
						<TextField
							{...params}
							inputRef={ref}
							error={!!error}
							helperText={error && error.message}
							placeholder={placeholder}
						/>
						{helperText && <FormHelperText>{helperText}</FormHelperText>}
					</>
				)}
				// placeholder={placeholder}
				{...resProps}
			/>
		</Box>
	)
}

//FormAutocomplete.defaultProps = {}

FormAutocomplete.propTypes = {
	name: PropTypes.string.isRequired,
	control: PropTypes.object.isRequired
}

export default React.memo(FormAutocomplete)
