const express = require('express');
const router = express.Router();
const userService = require('../component/user/user.service');
const { authGuard } = require('./guard.route');

/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     summary: Login user with credentials
 *     tags:
 *     - Authentication 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: login form
 *         description: UserForm object
 *         in:  body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/UserForm'
 *     responses:
 *      200:
 *          description: OK
 *          schema:
 *              type: object
 *              $ref: '#/definitions/Token'
 */
router.post('/sign-in', async (req, res) => {
    const user = await userService.authorize(req.body);
    if (!user) {
        res.status(400).send({message: `Wrong credentials.`, data: {email: req.body.email}});
    } else {
        res.send(user);
    }
});


/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     summary: Register user
 *     tags:
 *     - Authentication 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: register form
 *         description: UserForm object
 *         in:  body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/UserForm'
 *     responses:
 *      201:
 *          description: Created
 *          schema:
 *              type: object
 *              $ref: '#/definitions/Token'
 */
router.post('/sign-up', async (req, res) => {
    const user = await userService.createUser(req.body, true);
    if (!user) {
        res.status(400).send({message: `User with id: ${req.params.id} not found.`});
    } else {
        res.send(user);
    }
});

module.exports = router;
