const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8080;
const hostName = process.env.HOST_NAME;
const path = require('path');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const router = require('./router/index');

const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const cors = require('cors');
app.use(cors());


// const checkAuth = require('./client/check-auth-middleware');


// app.use(checkAuth);

// Sử dụng cookie-parser middleware
app.use(cookieParser());

// Override method
app.use(methodOverride('_method'));

//Middleware xử lý dữ liệu từ form data submit lên
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

// Middleware để parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware để parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', engine({
    extname: '.hbs',
}));

app.set('views', path.join(__dirname, 'resources', 'views'));
app.set('view engine', '.hbs');

app.use(morgan('combined'));

router(app);

app.listen(port, hostName, () => {
    console.log(`Listening port: ${port}, hostname: ${hostName}`);
})
