const db = require('../database');

const UserModel = {
    create: function (postTitle, postCategory) {
        return db.execute(
            "INSERT INTO communityPage (post_title ,post_category, post_votes, post_creation) VALUES (?, ?, 0, now());",
            [postTitle, postCategory]);
        }
    //         .then (([results, fields]) => {
    //             return Promise.resolve(results && results.affectedRows);
    //         })
    //         .catch((err) => {
    //             throw err;
    //         });
    // },
};

module.exports = UserModel;