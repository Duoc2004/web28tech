const express = require("express");
const multer = require("multer");
const storageMulter = require("../../helper/strorageMulter");
const upload = multer({ storage:storageMulter() })
const routes = express.Router();


const controller = require("../../controller/admin/product.controller");
const validate = require("../../validate/admin/product.validate");

routes.get("/", controller.index);

routes.patch("/change-status/:status/:id", controller.changeStatus);

routes.patch("/change-multi", controller.changeMulti);

routes.patch("/delete/:id", controller.deleteItem);

routes.get("/create", controller.create);

routes.post("/create",upload.single("thumbnail"),validate.createPostValidate, controller.createPost);

routes.get("/edit/:id",controller.edit);

routes.patch("/edit/:id",
        upload.single("thumbnail"),
        validate.createPostValidate,
        controller.createPatch);

routes.get("/detail/:id",controller.detail)

module.exports = routes; 