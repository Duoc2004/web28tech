const express = require("express");
const routes = express.Router();

const controller = require("../../controller/admin/dashboard.controller");

routes.get("/", controller.dashboard);

module.exports = routes;