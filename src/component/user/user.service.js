const User = require('./user.model');
const mongoose = require('mongoose');
const { encodeToken } = require('../../utils/jwt');

const getUsers = async (params, pagination) => {
    const users = await User.find(params).sort(pagination.sort).skip((pagination.page * pagination.limit) - pagination.limit).limit(pagination.limit);
    const nUsers = await User.countDocuments(params);
    return {
        pagination: {
            ...pagination,
            count: users.length,
            total: nUsers,
            sort: {
                enabled: !!pagination.sort,
                fields: pagination.sort
            },
            hasPrev: pagination.page > 1,
            hasNext: (pagination.page * pagination.limit) < nUsers,
            filter: params
        },
        items: users
    }
};
const getUser = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) return Promise.resolve(null);
    return User.findById(id, (err, result) => result);
};

const authorize = async (params) => {
    const user = await User.findOne({ email: params.email, password: params.password });
    if (!user) return Promise.resolve(null);
    return encodeToken(user);
};

const createUser = async (user, login = false) => {
    let newUser = new User({ ...user, roles: ['USER'] });
    try {
        await newUser.save();
    } catch (e) {
        return { message: `Duplicate email.`, data: {email: user.email} };
    }
    if (!newUser) return null;
    newUser = {_id: newUser._id, email: newUser.email, roles: newUser.roles};
    return login ? encodeToken(newUser) : newUser;
};

module.exports = {
    getUsers,
    getUser,
    authorize,
    createUser
};