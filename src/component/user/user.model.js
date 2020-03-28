let mongoose = require('mongoose');

/**
 * @swagger
 *
 * definitions:
 *   Pageable:
 *     type: object
 *     required:
 *       - token
 *     properties:
 *       page:
 *         type: integer
 *       limit:
 *         type: integer
 *       count:
 *         type: integer
 *       total:
 *         type: integer
 *       hasPrev:
 *         type: boolean
 *       hasNext:
 *         type: boolean
 *   Token:
 *     type: object
 *     required:
 *       - token
 *     properties:
 *       token:
 *         type: string
 *   UserForm:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *   UsersPageable:
 *     type: object
 *     properties:
 *       pagination:
 *         type: object
 *         $ref: '#/definitions/Pageable'
 *       items:
 *         type: array
 *         items:
 *             $ref: '#/definitions/User'	
 *   User:
 *      type: object
 *      properties:
 *          _id: 
 *              type: string
 *          email:
 *              type: string
 *          roles:
 *              type: array
 *              items:
 *                  type: string
 * 					enum: [USER, ADMIN]
 * 					example: USER
 *      
 */
let userSchema = mongoose.Schema({
	email: { type: String, unique: true },
	password: {
		type: String,
		select: false
	},
	roles: [
		String
	]
}, { collection: 'users' });

userSchema.pre('save', () => {
	console.log('Pre save', this);
});
let User = mongoose.model('User', userSchema);

module.exports = User;