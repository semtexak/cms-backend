const express = require('express');
const router = express.Router();
const { authGuard, adminRoleGuard } = require('./guard.route');
const postService = require('../component/post/post.service');

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts, filterable and pageable
 *     tags:
 *     - Posts 
 *     responses:
 *      200:
 *          description: OK
 *          schema:
 *              type: array
 *              items:
 *                  $ref: '#/definitions/Post'
 */
router.get('/', async (req, res) => {
    res.send(await postService.getPosts());
});

/**
 * @swagger
 * /posts/{slug}:
 *   get:
 *     summary: Get Post by Slug
 *     tags:
 *     - Posts 
 *     parameters:
 *     - in: path
 *       name: slug
 *       schema:
 *          type: string
 *          required: true
 *          description: slug of the post to get
 *     responses:
 *      200:
 *          description: No Content
 *          schema:
 *              type: object
 *              $ref: '#/definitions/Post'
 */
router.get('/:slug', async (req, res) => {
    const post = await postService.getPost(req.params.slug);
    if (!post) {
        res.status(404).send({message: `Post not found.`, data: req.params});
    } else {
        res.send(post);
    }
});

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Creates post
 *     tags:
 *     - Posts 
 *     responses:
 *      201:
 *          description: Created
 *          schema:
 *              type: object
 *              $ref: '#/definitions/Post'
 */
router.post('/', authGuard, adminRoleGuard, async (req, res) => {
    const post = await postService.createPost(req.body);
    console.log('AA', post);
    if (!post) {
        res.status(400).send({message: `Could not create post.`, data: req.body});
    } else if (post.type === 'ValidationError') {
        res.status(422).send({message: `Validation failed.`, ...post});
    } else {
        res.status(201).send(post);
    }
});

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Updates post
 *     tags:
 *     - Posts 
 *     parameters:
 *     - in: path
 *       name: postId
 *       schema:
 *          type: string
 *          required: true
 *          description: String ID of the post to update
 *     responses:
 *      204:
 *          description: No Content
 *          schema:
 *              type: object
 *              $ref: '#/definitions/Post'
 */
router.put('/:id', authGuard, adminRoleGuard, async (req, res) => {
    const post = await postService.updatePost(req.params.id, req.body);
    if (!post) {
        res.status(404).send({message: `Could not update post.`, path: `/posts/${req.params.id}`, data: req.body});
    } else {
        res.status(204).send(post);
    }
});

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Deletes post
 *     tags:
 *     - Posts
 *     parameters:
 *     - in: path
 *       name: postId
 *       schema:
 *          type: string
 *          required: true
 *          description: String ID of the post to delete
 *     responses:
 *      204:
 *          description: No Content
 */
router.delete('/:id', authGuard, adminRoleGuard, async (req, res) => {
    const post = await postService.deletePost(req.params.id);
    if (!post) {
        res.status(404).send({message: `Could not delete post.`, path: `/posts/${req.params.id}`});
    } else {
        res.status(204).send(null);
    }
});

module.exports = router;
