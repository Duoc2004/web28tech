const express = require("express");

const methodOverride = require("method-override");

const flash = require("express-flash");

const session = require("express-session");

const cookieParser = require("cookie-parser");

const bodyParser = require('body-parser');

require("dotenv").config();

const route = require("./route/client/index.route");
// route admin 
const routeAdmin = require("./route/admin/index.route");

const database = require("./config/database");

const systemConfig = require("./config/system");

database.connect();



const app = express();

const port = process.env.PORT;

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(`${__dirname}/public`));

app.set("views",`${__dirname}/views`);
app.set("view engine","pug");

// Falsh 
  app.use(cookieParser("ABC123"));
  app.use(session({ cookie: { maxAge: 60000 }}));
  app.use(flash());
// End Falsh 

// app local 

app.locals.prefixAdmin = systemConfig.prefixAdmin;

route(app);

routeAdmin(app);

app.listen(port, () => {
  console.log(`Duyệt Rồi Nhé Không Cần Chạy Lại Nữa ${port}`)
})