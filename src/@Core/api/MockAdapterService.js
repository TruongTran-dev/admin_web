/*
 * Created Date: 02-09-2021, 2:40:20 pm
 * Author: Peter
 * Email: phantrung696@gmail.com
 * -----
 * Last Modified: Wed Oct 12 2022
 * Modified By: Peter
 * -----
 * Copyright (c) 2021 VNE E-COMMERCE, Inc
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 */

import _ from 'lodash'
import MockAdapter from 'axios-mock-adapter'
import { checkRequestUrl, extractIdPathParamFromUrl, paginate } from './helper'

class MockAdapterService extends MockAdapter {
	apiService = {}

	setApiService = service => {
		this.apiService = service
		this.BASE_ENDPOINT = service.BASE_ENDPOINT
		return this
	}

	mockCRUD = () => {
		this.list()
		this.find()
		this.create()
		this.update()
		this.delete()
	}

	list = () => {
		this.onGet(this.BASE_ENDPOINT).reply(request => {
			const { search } = request.params
			let { is_active } = request.params
			let data = this.apiService.fakeData
			if (search) {
				// full text search
				const fullTextSearch = item =>
					JSON.stringify(Object.values(item)).toLowerCase().indexOf(search.toLowerCase())
				data = data.filter(item => fullTextSearch(item) > -1)
			}

			if (is_active === 'true') {
				is_active = true
			} else if (is_active === 'false') {
				is_active = false
			}
			if (is_active !== undefined && is_active !== null) {
				data = data.filter(item => item.is_active === is_active)
			}
			const newData = paginate(data, request.params)
			return [200, newData]
		})
	}

	find = () => {
		// Mock api get detail

		this.onGet(checkRequestUrl(`${this.BASE_ENDPOINT}/:id`)).reply(request => {
			const id = extractIdPathParamFromUrl(request)
			const data = this.apiService.fakeData.find(c => c.id === parseInt(id, 10))
			if (data) {
				return [200, { data }]
			}
			return [404, { message: 'Not found' }]
		})
	}

	create = () => {
		// Mock api add new
		this.onPost(this.BASE_ENDPOINT).reply(request => {
			const data = JSON.parse(request.data)
			data.id = _.last(this.apiService.fakeData)?.id + 1
			data.created_at = Date.now()
			this.apiService.fakeData.push(data)
			return [200, data]
		})
	}

	update = () => {
		// Mock api update
		this.onPut(checkRequestUrl(`${this.BASE_ENDPOINT}/:id`)).reply(request => {
			const id = extractIdPathParamFromUrl(request)
			const itemIndex = this.apiService.fakeData.findIndex(i => i.id === parseInt(id, 10))
			const data = JSON.parse(request.data)
			this.apiService.fakeData[itemIndex] = {
				...this.apiService.fakeData[itemIndex],
				...data
			}
			return [200, this.apiService.fakeData[itemIndex]]
		})
	}

	delete = () => {
		// Mock api delete
		this.onDelete(checkRequestUrl(`${this.BASE_ENDPOINT}/:id`)).reply(request => {
			const id = extractIdPathParamFromUrl(request)
			this.apiService.fakeData = this.apiService.fakeData.filter(item => item.id !== parseInt(id, 10))
			return [200, { message: 'Delete successfully' }]
		})
	}
}
export default MockAdapterService
