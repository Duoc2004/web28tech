const filterStatusHelper = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search");
const paginationHelper = require("../../helper/pagination");
const Product = require("../../models/product.models");
const systemConfig = require("../../config/system");

//[GET] /admin/products
module.exports.index = async (req, res) => {


    // Filter Status 


    const filterStatus = filterStatusHelper(req.query);

    // End Filter Status 

    let find = {
        deleted: false,

    };

    if (req.query.status) {
        find.status = req.query.status;
    }

    // doan search 
    const searchObject = searchHelper(req.query);

    if (searchObject.regex) {
        find.title = searchObject.regex; 
    }
    // doan end search 

    // Pagination
    const countProduct = await Product.countDocuments(find);
    let objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItem: 4
        },
        req.query,
        countProduct
    );

    // End Pagination

    const products = await Product.find(find)
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip)
        .sort({ position: "desc" });

    res.render("./admin/pages/products/index", {
        pageTitle: "Trang Danh Sách Sản Phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: searchObject.keyword,
        pagination: objectPagination
    });
}

//[PATCH] /admin/product/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;

    const id = req.params.id;

    await Product.updateOne({ _id: id }, { status: status });

    req.flash("success", "Đã Cập Nhật Được Sản Phẩm !");

    res.redirect("back");
}

//[PATCH] /admin/product/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    console.log(type)

    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
            req.flash("success", `Đã Cập Nhật trạng thái của  ${ids.length} sản phẩm !`);
            break;

        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
            req.flash("success", `Đã Cập Nhật trạng thái củacủa ${ids.length} sản phẩm!`);
            break;

        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } }, {
                deleted: true,
                deleteAt: new Date()
            })
            req.flash("success", `Đã Xóa Được ${ids.length} sản phẩm!`);
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);

                await Product.updateOne({ _id: id }, {
                    position: position
                });
                req.flash("success", `Đã Thay Đổi Vị Trí CủaCủa ${ids.length} sản phẩm!`);
            }
    }

    res.redirect('back');
}

//[DELETE] /admin/product/delete
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne({ _id: id },
        {
            deleted: true,
            deleteAt: new Date()
        });
    req.flash("success","Đã Xóa thành công sản phẩm !")
    res.redirect("back");
}
//[GET] /admin/product/create
module.exports.create = async (req, res) => {
    res.render("./admin/pages/products/create", {
        pageTitle: "Thêm mới Sản Phẩm"       
    });
}
//[POST] /admin/product/create
module.exports.createPost = async (req, res) => {
    req.body.price= parseInt(req.body.price);
    req.body.discountPercentage= parseInt(req.body.discountPercentage);
    req.body.stock= parseInt(req.body.stock);
    if(req.body.position == "") {
        const countProduct = await Product.countDocuments();
        req.body.position = countProduct + 1;
    }else{
        req.body.position = parseInt(req.body.position);
    }
    const products = new Product(req.body);
    await products.save();
    

    res.redirect(`${systemConfig.prefixAdmin}/product`);
}
//[GET] /admin/product/edit
module.exports.edit = async (req ,res) => {

    try {
        const product = await Product.findOne({
        deleted:false,
         _id:req.params.id
    });
        res.render("./admin/pages/products/edit", {
        pageTitle:"Trang Chỉnh Sửa Sản Phẩm",
        product:product
    });
    } catch (error) {
        req.flash("error","không tồn tại sản phẩm này , vui lòng chọn đúng sản phẩm !");
        res.redirect(`${systemConfig.prefixAdmin}/product`);
    }
}
//[PATCH] /admin/product/edit
module.exports.createPatch = async (req, res) => {
    try {
        req.body.price= parseInt(req.body.price);
        req.body.discountPercentage= parseInt(req.body.discountPercentage);
        req.body.stock= parseInt(req.body.stock);
        req.body.position= parseInt(req.body.position);
        if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`;
        }
        await Product.updateOne({_id:req.params.id}, req.body);
        
        res.redirect("back");
    } catch (error) {
        req.flash("error","Cập Nhật Thất Bại !");
        res.redirect(`${systemConfig.prefixAdmin}/product`);
    }
}
//[GET] /admin.product.detail
module.exports.detail = async (req ,res) => {
    try {
        const product = await Product.findOne({
            deleted:false,
            _id:req.params.id 
        });
        res.render("./admin/pages/products/detail", {
            pageTitle:product.title,
            product:product
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/product`);
    }
}



