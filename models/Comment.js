const { db, DataTypes, Model } = require("../db/connection.js")

class Comment extends Model {};

Comment.init({
    body: DataTypes.STRING,
    createdAt: new Date()
}, {
    sequelize: db,
    modelName: "Comment"
})


module.exports = Comment;