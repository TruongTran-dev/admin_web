/*
 * Created Date: 29-10-2022, 8:59:40 am
 * Author: Hai Tran
 * Email: you@you.you
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

import { Box, Checkbox, FormControlLabel, FormGroup, FormHelperText, FormLabel, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'

const CoreCheckboxGroup = props => {
	const { className, control, name, legendLabel, options, row, required, renderOption, disabled, ...restProps } =
		props

	const renderLabel = () => {
		return (
			<Typography variant="h3" className="text-primary flex items-center mb-4">
				<Typography
					className={clsx('text-black py-4 px-16 rounded-4 w-60  mx-8', required ? 'bg-yellow' : 'bg-white')}
				>
					{required ? '必須' : ''}
				</Typography>{' '}
				{legendLabel}
			</Typography>
		)
	}

	return (
		<Box className={className}>
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
					const handleChange = e => {
						onChange({
							...value,
							[e.target.name]: e.target.checked
						})
					}
					return (
						<Box className="flex flex-wrap sm:flex-nowrap mb-16 sm:mb-20">
							<Box className="w-full sm:w-1/3 mt-12 mb-8 sm:mb-0">
								{legendLabel != null ? renderLabel() : ''}
							</Box>

							<Box className="rounded-md flex w-full sm:w-2/3">
								<Box className="border-grey-400 border-1 rounded-4 w-full p-5 pl-12">
									<FormGroup row={row} {...restProps}>
										{options.map((field, index) =>
											renderOption ? (
												renderOption(`${name}.${field?.key}`, { ...field, disabled })
											) : (
												<FormControlLabel
													key={index}
													label={<Typography>{field?.label}</Typography>}
													control={
														<Checkbox
															name={field?.key}
															checked={Boolean(value[field?.key])}
															onChange={handleChange}
															color="primary"
														/>
													}
												/>
											)
										)}
									</FormGroup>
								</Box>
							</Box>
							{error && error.message && <FormHelperText error={!!error}>{error.message}</FormHelperText>}
						</Box>
					)
				}}
			/>
		</Box>
	)
}

CoreCheckboxGroup.defaultProps = {
	className: null,
	legendLabel: null,
	row: false,
	options: [],
	disabled: false
}

CoreCheckboxGroup.propTypes = {
	className: PropTypes.string,
	control: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	legendLabel: PropTypes.string,
	row: PropTypes.bool,
	required: PropTypes.bool,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
			label: PropTypes.any.isRequired,
			disabled: PropTypes.bool
		})
	).isRequired,
	renderOption: PropTypes.func,
	disabled: PropTypes.bool
}

export default React.memo(CoreCheckboxGroup)
