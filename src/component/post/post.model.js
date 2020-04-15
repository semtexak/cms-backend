let mongoose = require('mongoose');
const { slugify } = require('../../utils/validations');

/**
 * @swagger
 *
 * definitions:
 *   PostForm:
 *     type: object
 *     required:
 *       - title
 *       - content
 *     properties:
 *       title:
 *         type: string
 *       content:
 *         type: string
 *       categories:
 *         type: array
 *         items:
 *         	$ref: '#/definitions/Post'
 *   Post:
 *      type: object
 *      properties:
 *          _id: 
 *              type: string
 *          title:
 *              type: string
 *          perex:
 *               type: string
 *          content:
 *               type: string
 *          author:
 *               type: object
 *               $ref: '#/definitions/User'
 *          categories:
 *              type: array
 *              items:
 *                  type: object
 *                  $ref: '#/definitions/Category'
 */
let postSchema = mongoose.Schema({
	title: { type: String, required: [true, 'Title is required.'] },
	perex: String,
	content: { type: String, required: [true, 'Content is required.'] },
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	categories: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category'
		}
	],
	tags: [String],
	img: String,
	createdAt: Number,
	updatedAt: Number,
	slug: { type: String, unique: true },
}, { collection: 'posts' });


postSchema.pre('save', function(next) {
	const {id} = this;
	console.log('SAVE');
	this.set({ slug: slugify(`${this.title} ${id.slice(Math.max(id.length - 7, 0))}`), createdAt: new Date()});
	next();
});

postSchema.pre('updateOne', function() {
	this.set({ updatedAt: new Date() });
});

let Post = mongoose.model('Post', postSchema);

module.exports = Post;