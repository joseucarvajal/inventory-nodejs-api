const express = require('express');

import calculatorRoutes from "./app/routes/calculator-routes";
import productsRoutes from "./app/routes/product-routes";

const app = express();

// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/v1', calculatorRoutes);
app.use('/api/v1', productsRoutes);

app.listen(3000).on('listening', () => {
    console.log(`app running on 3000`);
});

export default app;


