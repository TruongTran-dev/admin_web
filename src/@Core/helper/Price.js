/*
 * Created Date: 19-10-2022, 10:32:46 pm
 * Author: Peter
 * Email: phantrung696@gmail.com
 * -----
 * Last Modified:
 * Modified By: Peter
 * -----
 * Copyright (c) 2022 PROS+ Group , Inc
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 */

export const formatPrice = (priceString, delimiter = ',') => {
	if (!priceString) {
		return 0
	}

	return priceString.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${delimiter}`)
}
