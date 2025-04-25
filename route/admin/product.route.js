const express = require("express");
const multer = require("multer");

const upload = multer();
const routes = express.Router();


const controller = require("../../controller/admin/product.controller");
const validate = require("../../validate/admin/product.validate");
const uploads = require("../../middlewares/admin/uploadCloud.middlewares");

routes.get("/", controller.index);

routes.patch("/change-status/:status/:id", controller.changeStatus);

routes.patch("/change-multi", controller.changeMulti);

routes.patch("/delete/:id", controller.deleteItem);

routes.get("/create", controller.create);

routes.post("/create",
upload.single("thumbnail"),
uploads.uploadCloud,
validate.createPostValidate,
 controller.createPost);

routes.get("/edit/:id",controller.edit);

routes.patch("/edit/:id",
        validate.createPostValidate,
        uploads.uploadCloud,
        controller.createPatch
);

routes.get("/detail/:id",controller.detail)

module.exports = routes; 