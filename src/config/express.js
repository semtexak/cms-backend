const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const postRouter = require('./../routes/post.route');
const userRouter = require('./../routes/user.route');
const authRouter = require('./../routes/auth.route');
const categoryRouter = require('./../routes/category.route');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(cors());

// app.use(express.static(__dirname + '/dist/application'));
// app.get('/*', (req: any, res: any) => res.sendFile(__dirname + '/dist/application/' + 'index.html'));

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Content Management System Api"
        }
    },
    apis: ['./src/routes/*.js', './src/component/**/*.model.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Routing
router.use('/categories', categoryRouter);
router.use('/posts', postRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(router);

module.exports = app;