const dashboardRoutes = require("./dashbroad.route");
const productRoutes = require("./product.route");

const systemconfig = require("../../config/system");


module.exports = (app) => {
    const PATH_ADMIN = systemconfig.prefixAdmin;

    app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);
    
    app.use(PATH_ADMIN + "/product", productRoutes);
} 

