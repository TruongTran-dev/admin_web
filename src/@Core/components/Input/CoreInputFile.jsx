/*
 * Created Date: 08-10-2021, 5:19:27 pm
 * Author: Trần Quang Hùng
 * Email: you@you.you
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

import { Box, Icon, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material'

import PropTypes from 'prop-types'
import React, { useCallback, useRef, useState } from 'react'
import { useController } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const CoreInputFile = props => {
	const {
		className,
		control,
		name,
		label,
		placeholder,
		fileType,
		InputLabelProps,
		inputProps,
		InputProps,
		required,
		helperText,
		accept,
		isPreview = false,
		multiple,
		...restProps
	} = props
	const { t } = useTranslation('common')
	const inputRef = useRef()

	const {
		field: { onChange, value, ref },
		fieldState: { error }
	} = useController({ name, control })

	const [file, setFile] = useState(null)

	const handleChange = useCallback(
		async event => {
			const { files } = event.target

			console.log('============= file', files[0])
			if (files[0]) {
				setFile(files[0])
				onChange(files[0])
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[t]
	)

	const handleClick = () => {
		inputRef.current.click()
	}

	return (
		<Box className={className}>
			<>
				<TextField
					fullWidth
					label={label}
					placeholder={placeholder || t('form.input_file_empty')}
					value={value?.name ?? null}
					inputRef={ref}
					error={!!error}
					helperText={(error && error.message) || helperText || undefined}
					InputLabelProps={{
						shrink: placeholder ? true : undefined,
						required,
						...InputLabelProps
					}}
					inputProps={{
						...inputProps
					}}
					// eslint-disable-next-line react/jsx-no-duplicate-props
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								{/* {uploadingImage ? (
									<CircularProgress color="inherit" size={20} className="mx-8" />
								) : (
									<IconButton color="primary" onClick={handleClick}>
										<Icon>cloud_upload</Icon>
									</IconButton>
								)} */}
								<IconButton color="primary" onClick={handleClick}>
									<Icon>cloud_upload</Icon>
								</IconButton>
							</InputAdornment>
						),
						readOnly: true,
						...InputProps
					}}
					{...restProps}
				/>

				<input type="file" accept={accept} ref={inputRef} onChange={handleChange} className="hidden" />
			</>
		</Box>
	)
}

CoreInputFile.defaultProps = {
	className: null,
	label: null,
	placeholder: null,
	InputLabelProps: null,
	inputProps: null,
	InputProps: null,
	required: false,
	helperText: null,
	accept: null
}
CoreInputFile.propTypes = {
	className: PropTypes.string,
	control: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	InputLabelProps: PropTypes.object,
	inputProps: PropTypes.object,
	InputProps: PropTypes.object,
	required: PropTypes.bool,
	helperText: PropTypes.string,
	accept: PropTypes.string
}

export default React.memo(CoreInputFile)
