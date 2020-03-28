const Category = require('./category.model');
const mongoose = require('mongoose');

const getCategories = async (params) => {
    return Category.find(params, (err, result) => result);
};
const getCategory = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) return Promise.resolve(null);
    return Category.findById(id, (err, result) => result);
};

const createCategory = async (category) => {
    const newCategory = new Category({ ...category });
    try {
        await newCategory.save();
    } catch (e) {
        return { message: e };
    }
    if (!newCategory) return null;
    return newCategory;
};

const updateCategory = async (id, params) => {
    return Category.updateOne({_id: id}, params);
};

const deleteCategory = async (id) => {
    return Category.deleteOne({_id: id});
};

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
};