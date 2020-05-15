import dbQuery from "../db/query";

import { errorMessage, successMessage, status  } from "../helpers/http-status-helper";

export const getProductsByCategory = async (request, response) => {

    const getProductsQuery = 'SELECT * from products';

    const { rows } = await dbQuery.query(getProductsQuery);

    if (!rows) {
        errorMessage.error = 'Error getting products';
        return response.status(status.bad).errorMessage();
    }

    successMessage.data = rows;
    return response.status(status.success).send(successMessage) ;
}