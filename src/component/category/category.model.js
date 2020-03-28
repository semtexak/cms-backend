let mongoose = require('mongoose');

/**
 * @swagger
 *
 * definitions:
 *   CategoryForm:
 *     type: object
 *     required:
 *       - name
 *     properties:
 *       name:
 *         type: string
 *   Category:
 *      type: object
 *      properties:
 *          _id: 
 *              type: string
 *          name:
 *              type: string
 *          slug:
 *              type: string
 */
let categorySchema = mongoose.Schema({
	name: String,
	slug: { type: String, unique: true },
	isHidden: Boolean
}, { collection: 'categories' });

categorySchema.pre('save', function (next) {
	this.set({ slug: string_to_slug(this.name) });
	next();
});

categorySchema.pre('updateOne', function (next) {
	console.log('updateOne', this);
	next();
});

let Category = mongoose.model('Category', categorySchema);


function string_to_slug(str) {
	str = str.replace(/^\s+|\s+$/g, ""); // trim
	str = str.toLowerCase();

	// remove accents, swap ñ for n, etc
	var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
	var to = "aaaaaaeeeeiiiioooouuuunc------";

	for (var i = 0, l = from.length; i < l; i++) {
		str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
	}

	str = str
		.replace(/[^a-z0-9 -]/g, "") // remove invalid chars
		.replace(/\s+/g, "-") // collapse whitespace and replace by -
		.replace(/-+/g, "-"); // collapse dashes

	return str;
}

module.exports = Category;