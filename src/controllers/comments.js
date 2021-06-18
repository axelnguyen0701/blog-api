const Comment = require('../models/comment');

exports.list_all_comments_GET = async (req, res, next) => {
	try {
		comment_list = await Comment.find()
		res.json(comment_list)
	} catch (error) {
		next(error);
	}

}