const express = require('express');
const router = express.Router();
const { authGuard, adminRoleGuard } = require('./guard.route');
const categoryService = require('../component/category/category.service');

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags:
 *     - Categories 
 *     responses:
 *      '200':
 *          description: OK
 *          schema:
 *              type: array
 *              items:
 *                  $ref: #/definitions/Category
 */
router.get('/', async (req, res) => {
    res.send(await categoryService.getCategories());
});

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get Category by ID
 *     tags:
 *     - Categories 
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *          type: string
 *          required: true
 *          description: String ID
 *     responses:
 *      200:
 *          description: OK
 *          schema:
 *              type: object
 *              $ref: '#/definitions/Category'
 */
router.get('/:id', async (req, res) => {
    const category = await categoryService.getCategory(req.params.id);
    if (!category) {
        res.status(404).send({message: `Category not found.`, data: req.params});
    } else {
        res.send(category);
    }
});

/**
 * @swagger
 *
 * /categories:
 *   post:
 *     summary: Creates a category
 *     description: Creates a category
 *     tags:
 *     - Categories
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: form
 *         description: Category form object
 *         in:  body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/CategoryForm'
 *     responses:
 *       201:
 *         description: Created category
 *         schema:
 *           $ref: '#/definitions/Category'
 */
router.post('/', authGuard, adminRoleGuard, async (req, res) => {
    const category = await categoryService.createCategory(req.body);
    if (!category) {
        res.status(400).send({message: `Could not create post.`, data: req.body});
    } else {
        res.status(201).send(category);
    }
});

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Updates category
 *     tags:
 *     - Categories 
 *     parameters:
 *     - in: path
 *       name: categoryId
 *       schema:
 *          type: integer
 *          required: true
 *          description: String ID of the category to update
 *     responses:
 *      204:
 *          description: No Content
 *          schema:
 *              type: object
 *              $ref: '#/definitions/Category'
 */
router.put('/:id', authGuard, adminRoleGuard, async (req, res) => {
    const category = await categoryService.updateCategory(req.params.id, req.body);
    if (!category) {
        res.status(404).send({message: `Could not update category.`, path: `categories/${req.params.id}`, data: req.body});
    } else {
        res.status(204).send(category);
    }
});

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Deletes category
 *     tags:
 *     - Categories
 *     parameters:
 *     - in: path
 *       name: categoryId
 *       schema:
 *          type: integer
 *          required: true
 *          description: String ID of the category to delete
 *     responses:
 *      '204':
 *          description: No Content
 *          content:
 *              text/plain:
 *                  schema:
 *                      type: string
 *                      example: pong
 */
router.delete('/:id', authGuard, adminRoleGuard, async (req, res) => {
    const category = await categoryService.deleteCategory(req.params.id);
    if (!category) {
        res.status(404).send({message: `Could not delete category.`, path: `categories/${req.params.id}`});
    } else {
        res.status(204).send(null);
    }
});

module.exports = router;
