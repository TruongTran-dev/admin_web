/*
 * Created Date: 12-10-2022, 10:11:22 pm
 * Author: Peter
 * Email: phantrung696@gmail.com
 * -----
 * Last Modified:
 * Modified By: haitran
 * -----
 * Copyright (c) 2022 PROS+ Group , Inc
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 */

import { FormHelperText, Icon, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import clsx from 'clsx'
import moment from 'moment'
import React, { forwardRef, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { useController } from 'react-hook-form'
// import PropTypes from 'prop-types'

const CoreDatePicker = ({
	className = '',
	label = '',
	control,
	name = '',
	defaultValue,
	rules,
	required = false,
	helperText,
	placeholder = '',
	size = ''
}) => {
	const {
		field: { onChange, onBlur, value, ref },
		fieldState: { error }
	} = useController({
		control,
		name,
		defaultValue,
		rules
	})

	const CustomInput = forwardRef(({ value, onClick }, ref) => (
		<TextField
			fullWidth
			variant="outlined"
			value={value ? moment(value).format('YYYY/MM/DD') : null}
			// onClick={onClick}
			InputProps={{
				endAdornment: (
					<>
						{value ? (
							<Icon
								onClick={() => onChange(null)}
								fontSize="small"
								className="cursor-pointer rounded-full"
							>
								close
							</Icon>
						) : null}
						<Icon className="cursor-pointer" onClick={onClick}>
							calendar_month
						</Icon>
					</>
				)
			}}
			ref={ref}
			error={!!error}
			inputProps={{
				readOnly: true
			}}
			size={size}
			placeholder={placeholder}
		/>
	))

	const renderLabel = () => {
		return (
			<Typography component="div" variant="body2" className="flex items-center mb-4">
				<Typography
					className={clsx('text-black py-4 px-16 rounded-4 w-60  mx-8', required ? 'bg-yellow' : 'bg-white')}
				>
					{required ? '必須' : ''}
				</Typography>{' '}
				{label}
			</Typography>
		)
	}

	return (
		<Box
			className={className}
			sx={{
				'& .react-datepicker': {
					fontSize: '1.1rem',
					'& .react-datepicker__month': {
						margin: 1
					}
				}
			}}
		>
			{label !== '' ? renderLabel() : null}
			<ReactDatePicker
				selected={value}
				onChange={date => onChange(date)}
				customInput={<CustomInput />}
				withPortal
				ref={ref}
				onCalendarClose={onBlur}
			/>
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
			{error && error.message && <FormHelperText error>{error.message}</FormHelperText>}
		</Box>
	)
}

//CoreDatePicker.defaultProps = {}

//CoreDatePicker.propTypes = {}

export default React.memo(CoreDatePicker)
