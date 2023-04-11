/*
 * Created Date: 20-10-2022, 3:41:46 pm
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

import { FormHelperText, InputLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useController } from 'react-hook-form'
import PropTypes from 'prop-types'
import clsx from 'clsx'
const AdminInput = props => {
	const {
		className,
		control,
		name,
		label,
		placeholder,
		InputLabelProps,
		inputProps,
		InputProps,
		required,
		readOnly,
		type,
		multiline,
		minRows,
		hidden,
		helperText,
		allowTranslation,
		disabled,
		classNameField,
		rules,
		defaultValue,
		...restProps
	} = props
	const {
		field: { onChange, onBlur, value, ref },
		fieldState: { error }
	} = useController({
		control,
		name,
		defaultValue,
		rules
	})

	let { transform } = props

	if (type === 'number') {
		transform = {
			input: value => value,
			output: e => {
				const output = e.target.value
				return Number.isNaN(output) ? 0 : Number(output)
			}
		}
	}

	const renderLabel = () => {
		if (label)
			return (
				<Box className="w-full sm:w-1/3 mt-12 mb-8 sm:mb-0">
					<Typography variant="h3" color="primary" className="flex items-center mb-4">
						<Typography
							className={clsx(
								'text-black py-4 px-16 rounded-4 w-60  mx-8',
								required ? 'bg-yellow' : 'bg-white'
							)}
						>
							{required ? '必須' : ''}
						</Typography>{' '}
						{label}
					</Typography>
				</Box>
			)
	}

	return (
		<Box className={clsx('admin-input flex flex-wrap sm:flex-nowrap', className)}>
			{/* <Box className="w-full sm:w-1/3 mt-12 mb-8 sm:mb-0"> */}
			{renderLabel()}
			{/* </Box> */}
			<Box className={label ? 'w-full sm:w-2/3' : 'w-full'}>
				<TextField
					fullWidth
					type={type === 'number' ? 'text' : type}
					// label={renderLabel()}
					placeholder={placeholder}
					onChange={e => onChange(transform.output(e))}
					onBlur={onBlur}
					value={transform.input(value)}
					inputRef={ref}
					multiline={multiline}
					minRows={minRows}
					disabled={disabled}
					className={classNameField}
					error={!!error}
					InputLabelProps={{
						shrink: placeholder ? true : undefined,
						required,
						...InputLabelProps
					}}
					inputProps={{
						readOnly,
						...inputProps
					}}
					// eslint-disable-next-line react/jsx-no-duplicate-props
					InputProps={{
						...InputProps,
						...(type === 'number' && {
							inputComponent: NumberFormatCustom
						})
					}}
					{...restProps}
				/>
				{helperText && <FormHelperText>{helperText}</FormHelperText>}
				{error && error.message && <FormHelperText error>{error.message}</FormHelperText>}
			</Box>
		</Box>
	)
}

AdminInput.defaultProps = {
	className: null,
	label: null,
	placeholder: null,
	transform: {
		input: value => value,
		output: e => e
	},
	InputLabelProps: null,
	inputProps: null,
	InputProps: null,
	required: false,
	type: 'text',
	multiline: false,
	minRows: 5,
	disabled: false,
	allowTranslation: false
}

AdminInput.propTypes = {
	className: PropTypes.string,
	control: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	transform: PropTypes.object,
	InputLabelProps: PropTypes.object,
	inputProps: PropTypes.object,
	InputProps: PropTypes.object,
	required: PropTypes.bool,
	readOnly: PropTypes.bool,
	type: PropTypes.string,
	multiline: PropTypes.bool,
	minRows: PropTypes.number,
	disabled: PropTypes.bool,
	hidden: PropTypes.bool,
	helperText: PropTypes.any,
	rules: PropTypes.object,
	allowTranslation: PropTypes.bool
}

export default React.memo(AdminInput)
