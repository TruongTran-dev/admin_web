/*
 * Created Date: 22-10-2022, 11:44:13 pm
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

import { Box, Button, Divider, FormHelperText, Typography } from '@mui/material'
import clsx from 'clsx'
import Image from 'mui-image'
import React, { useCallback, useRef, useState } from 'react'
import { useController } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
// import PropTypes from 'prop-types'

const AdminInputUpload = ({
	control = {},
	name = '',
	rules,
	required = false,
	label = '',
	helperText = '',
	hideButton
}) => {
	const { t } = useTranslation('common')
	const inputRef = useRef()
	const [file, setFile] = useState()
	const [previewFile, setPreviewFile] = useState()

	const {
		field: { onChange, value },
		fieldState: { error }
	} = useController({
		control,
		name,
		rules
	})

	const handleChangeInput = useCallback(
		async event => {
			const { files } = event.target

			console.log('============= file', files[0])
			if (files[0]) {
				setFile(files[0])
				onChange(files[0])
				handlePreviewFile(files[0])
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[t]
	)

	const handlePreviewFile = file => {
		const reader = new FileReader()

		reader.onload = event => {
			setPreviewFile(event.target.result)
		}

		reader.readAsDataURL(file)
	}

	const handleAddFile = () => {
		inputRef.current.click()
	}

	const handleDeleteFile = () => {
		setFile(null)
		setPreviewFile(null)
	}

	const renderLabel = () => {
		return (
			<Typography variant="h3" color="primary" className="flex items-center">
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
		<Box className="flex flex-wrap sm:flex-nowrap mb-16 sm:mb-20">
			<Box className="w-full sm:w-1/3 mt-12 mb-8 sm:mb-0">{renderLabel()}</Box>
			<Box className="flex flex-wrap sm:flex-nowrap space-x-12 w-full sm:w-2/3">
				<Box className="w-full sm:w-2/3 ">
					<Box className="border-1 mb-12 sm:mb-0 border-grey-400 w-full rounded-4">
						<Box className="h-256 bg-grey-200">
							<Image
								src={previewFile ?? ''}
								wrapperClassName="h-256"
								errorIcon={<img src="/img/event/no_image.png" />}
								showLoading
							/>
						</Box>
						{helperText && (
							<>
								<Divider />
								<Box className="p-12">推奨サイズ : 100 x 100</Box>
							</>
						)}
					</Box>
					{error && error.message && <FormHelperText error>{error.message}</FormHelperText>}
				</Box>
				{!hideButton && (
					<Box className="w-full sm:w-1/3 self-center">
						<Button variant="contained" color="error" size="small" onClick={handleDeleteFile}>
							{t('btn.delete')}
						</Button>
						<Button
							variant="contained"
							color="primary"
							className="bg-[#58AAFF] mx-8"
							size="small"
							onClick={handleAddFile}
						>
							{t('btn.addition')}
						</Button>
					</Box>
				)}
			</Box>
			<input className="hidden" type="file" ref={inputRef} onChange={handleChangeInput} accept="image/*" />
		</Box>
	)
}

//AdminInputUpload.defaultProps = {}

//AdminInputUpload.propTypes = {}

export default React.memo(AdminInputUpload)
