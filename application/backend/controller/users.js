const UserModel = require('../model/users');

const UserController = {
    createUser: function(req, resp, next) {
        let postTitle = req.body.postTitle;
        let postCategory = req.body.postCategory;
        return UserModel.create(postTitle,postCategory);
    }
};
module.exports = UserController;