function formatValidationMessage(err) {
    return {
        type: 'ValidationError',
        details: {
            errors: Object.keys(err.errors).map(key => ({ field: key, type: err.errors[key].kind, message: err.errors[key].message }))
        }
    }
}

function slugify(str) {
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

module.exports = {
    formatValidationMessage,
    slugify
}