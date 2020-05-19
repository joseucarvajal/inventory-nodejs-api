import dbQuery from "../db/query";

import { errorMessage, successMessage, status } from "../helpers/http-status-helper";

export const getProductsByCategory = async (request, response) => {

    const getProductsQuery = `
        SELECT 
            c.id as categoryid, c.name as categoryname, p.id, p.name, p.price 
        FROM 
            category c INNER JOIN products p ON p.category = c.id
    `;

    const { rows } = await dbQuery.query(getProductsQuery);

    if (!rows) {
        errorMessage.error = 'Error getting products';
        return response.status(status.bad).errorMessage();
    }

    const hashCategories = {};
    for (let row of rows) {
        if (!hashCategories[row.categoryid]) {
            hashCategories[row.categoryid] = {
                id: row.categoryid,
                name: row.categoryname,
                products: [
                    {
                        id: row.id,
                        name: row.name,
                        price: row.price
                    }
                ]
            }
        }
        else {
            hashCategories[row.categoryid].products.push({
                id: row.id,
                name: row.name,
                price: row.price                
            });
        }
    }
    
    const categoriesData = [];
    for(let category in hashCategories){
        categoriesData.push(hashCategories[category]);        
    }    
    
    successMessage.data = categoriesData;
    return response.status(status.success).send(successMessage);
}