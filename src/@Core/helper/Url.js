/*
 * Created Date: 25-10-2022, 11:38:57 am
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

import { get } from 'lodash'

export const getQueryUrlObject = key => {
	const params = new URLSearchParams(window.location.search)
	const result = {}
	// eslint-disable-next-line
	for (let entry of params) {
		// each 'entry' is a [key, value] tupple
		const [key, value] = entry
		result[key] = value
	}
	if (key) {
		return get(result, key)
	}
	return result
}

export function isLocalhost() {
	return window.location.origin.indexOf('localhost') > -1
}

export const isValidUrl = str => {
	let url
	try {
		url = new URL(str)
	} catch (e) {
		console.error(e)
		return false
	}
	return url.protocol === 'http:' || url.protocol === 'https:'
}
