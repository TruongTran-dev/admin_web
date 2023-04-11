/*
 * Created Date: 07-09-2021, 3:56:24 pm
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

export const checkRequestUrl = (path = '') => {
	path = typeof path === 'string' ? new RegExp(path.replace(/:\w+/g, '[^/]+')) : path
	return path
}

export const extractIdPathParamFromUrl = request => {
	return request.url.split('/').pop()
}

export const paginate = (json, params) => {
	const pageNumber = Number(params?.page) ?? 1
	const pageSize = Number(params?.size) ?? 10
	const getAll = params?.all

	if (getAll === 'true') {
		return json
	}
	if (!pageNumber && !pageSize) {
		return json
	}
	const data = {}
	const minIndex = (pageNumber - 1) * pageSize
	const maxIndex = pageNumber * pageSize
	const totalRecords = json.length
	data.data = json.slice(minIndex, maxIndex)
	data.page = pageNumber
	data.size = pageSize
	data.total = totalRecords
	data.total_pages = Math.ceil(totalRecords / pageSize)
	return data
}

export const convertDataChildren = (data = []) => {
	const getChildren = item => {
		if (item.parent_id > 0) {
			item.children = data.filter(_i => _i.parent_id === item.id).map(item => getChildren(item))
		}
		return item
	}
	return data
		.filter(i => i.parent_id === 0)
		.map(item => {
			item.children = data.filter(_i => _i.parent_id === item.id).map(item => getChildren(item))
			return item
		})
}
