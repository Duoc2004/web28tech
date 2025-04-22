const Product = require("../../models/product.models");

module.exports.index = async (req,res) =>{
    const products = await Product.find({
        status:"active",
        deleted:false
    }).sort({position:"desc"});

    const newProduct = products.map(item =>{
        item.newPrice = 
        (item.price * (100 - item.discountPercentage)/100).toFixed(0); 
    })
    console.log(products);
    res.render("./client/pages/products/index",{
        pageTitle:"Trang Danh Sách Sản Phẩm",
        products:products
    })
} 

module.exports.detail = async (req ,res) => {
    try {
        const product = await Product.findOne({
            deleted:false,
            status:"active",
            slug:req.params.slug
        });
    
        res.render("./client/pages/products/detail.pug", {
            pageTitle:product.slug,
            product:product
    
        });
    } catch (error) {
        res.redirect("/products");
    }
}