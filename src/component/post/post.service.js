const Post = require('./post.model');
const { formatValidationMessage } = require('../../utils/validations');

const getPosts = async (params) => {
    return Post.find(params, (err, result) => result).populate('author categories');
};
const getPost = async (slug) => {
    return Post.findOne({slug}, (err, result) => result).populate('author categories');
};

const createPost = async (post, login = false) => {
    const newPost = new Post({...post, roles: ['USER']});
    try {
    await newPost.save();
    } catch (e) {
        if (e.name === 'ValidationError') {
            return formatValidationMessage(e);
        }
        return {message: 'Error occured while creating post.', details: e};
    }
    if (!newPost) return null;
    return newPost;
};

const updatePost = async (id, params) => {
    return Post.updateOne({_id: id}, params);
};

const deletePost = async (id) => {
    return Post.deleteOne({_id: id});
};

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
};