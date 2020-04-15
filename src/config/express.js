const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const postRouter = require('./../routes/post.route');
const userRouter = require('./../routes/user.route');
const authRouter = require('./../routes/auth.route');
const categoryRouter = require('./../routes/category.route');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path')

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(cors());

// console.log(path.join(__dirname, '../../../'));
// app.use(express.static(path.join(__dirname, '../../', '/dist/application')));
// app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../../', '/dist/application/', 'index.html')));

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Content Management System Api"
        },
        basePath: '/api/v1'
    },
    apis: ['./src/routes/*.js', './src/component/**/*.model.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Routing
router.use('/api/v1/categories', categoryRouter);
router.use('/api/v1/posts', postRouter);
router.use('/api/v1/users', userRouter);
router.use('/api/v1/auth', authRouter);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(router);

module.exports = app;