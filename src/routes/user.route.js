const express = require('express');
const router = express.Router();
const userService = require('../component/user/user.service');
const { authGuard, adminRoleGuard } = require('./guard.route');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users, filterable and pageable
 *     tags:
 *     - Users 
 *     parameters:
 *     - in: query
 *       name: page
 *       schema:
 *          type: integer
 *          required: false
 *          description: Page
 *     - in: query
 *       name: limit
 *       schema:
 *          type: integer
 *          required: false
 *          description: Limit records
 *     responses:
 *      200:
 *          description: OK
 *          schema:
 *              type: object
 *              $ref: '#/definitions/UsersPageable'
 */
router.get('/', authGuard, adminRoleGuard, async (req, res) => {
    res.send(await userService.getUsers(req.query.filter, {page: +req.query.page || 1, limit: +req.query.limit || 10, sort: req.query.sort || null}));
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *     - Users 
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *          type: integer
 *          required: true
 *          description: Numeric ID of the user to get
 *     responses:
 *      '200':
 *          description: OK
 *          schema:
 *              type: object
 *              $ref: '#/definitions/User'
 *              example:
 *                  _id: 5e78e79e5d6a004828cd9e85
 *                  email: example@example.com
 *                  roles: [USER]
 */
router.get('/:id', authGuard, async (req, res) => {
    const user = await userService.getUser(req.params.id);
    if (!user) {
        res.status(404).send({message: `User with id: ${req.params.id} not found.`});
    } else {
        res.send(user);
    }
});

/**
 * @swagger
 *
 * /users:
 *   post:
 *     summary: Creates a user
 *     description: Creates a user
 *     tags:
 *     - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in:  body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/UserForm'
 *     responses:
 *       201:
 *         description: Created user
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.post('/', async (req, res) => {
    const user = await userService.createUser(req.body);
    if (!user) {
        res.status(400).send({message: `User with id: ${req.params.id} not found.`});
    } else {
        res.send(user);
    }
});

module.exports = router;
