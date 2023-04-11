/*
 * Created Date: 07-10-2021, 2:52:26 pm
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

import moment from 'moment'

class BaseModel {
	constructor() {
		this.created_at = moment().format()
	}
}
// BaseModel.prototype.
export default BaseModel
