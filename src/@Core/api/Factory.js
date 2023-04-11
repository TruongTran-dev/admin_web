/*
 * Created Date: 29-08-2021, 2:33:04 pm
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

import BaseModel from './BaseModel'

class BaseFactory {
	factoryModel = {}

	data = []

	setFactoryModel = (obj = {}) => {
		this.factoryModel = obj
		return this
	}

	createModel = i => {
		const _newObj = new BaseModel()
		_newObj.id = i + 1
		Object.keys(this.factoryModel).map(key => {
			const value = this.factoryModel[key]
			if (typeof value === 'function') {
				_newObj[key] = value.call(_newObj, i)
			} else {
				_newObj[key] = value
			}

			return key
		})

		return _newObj
	}

	makeData = (...lens) => {
		const makeDataLevel = (depth = 0) => {
			const len = lens[depth]
			return Array.from(new Array(len)).map((d, index) => {
				return this.createModel(index)
				// return {
				// 	...this.createModel(index),
				// 	subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
				// }
			})
		}
		this.data = makeDataLevel()
		return this
	}

	setData = (data = []) => {
		this.data = data
		return this
	}

	getData = () => {
		return this.data
	}

	belongsTo = (factoryClass, foreign_key, key_name) => {}

	/**
	 * @param  {} obj={}
	 * @return factory function create a object Model
	 */
	extends = obj => {
		return i => {
			const _newObj = new BaseModel()
			_newObj.id = i + 1
			Object.keys(obj).map(key => {
				const value = obj[key]
				if (typeof value === 'function') {
					_newObj[key] = value.call(_newObj, i)
				} else {
					_newObj[key] = value
				}

				return key
			})

			return _newObj
		}
	}
}
export const Factory = new BaseFactory()
export default BaseFactory
// export const Factory = {
// 	extends(obj = {}) {
// 		return i => {
// 			const _newObj = new Model()
// 			_newObj.id = i + 1
// 			_newObj.created_at = Date.now()
// 			Object.keys(obj).map(key => {
// 				const value = obj[key]
// 				if (typeof value === 'function') {
// 					_newObj[key] = value.call(_newObj, i)
// 				} else {
// 					_newObj[key] = value
// 				}

// 				return key
// 			})

// 			return _newObj
// 		}
// 	}
// }
