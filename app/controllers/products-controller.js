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
        return response.status(status.bad).send(errorMessage);
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

export const addProduct = async (request, response) => {

    try{
        const { id, name, price, category, stock } = request.body;

        const addProductQuery = `
            INSERT into products (id, name, price, category, stock)
            VALUES ($1, $2, $3, $4, $5)
        `;
        const values = [id, name, price, category, stock];
    
        const { rowCount } = await dbQuery.query(addProductQuery, values);
    
        if (!rowCount) {
            errorMessage.error = 'Error creating product';
            return response.status(status.bad).send(errorMessage);
        }
    
        successMessage.data = rowCount;
        successMessage.message = `${rowCount} product created successfully`;
        return response.status(status.success).send(successMessage);
    }
    catch(err){
        errorMessage.error = `Error creating product: ${err}`;;
        return response.status(status.bad).send(errorMessage);
    }
}