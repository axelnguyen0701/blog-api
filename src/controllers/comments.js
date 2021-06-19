const Comment = require("../models/comment");
const { body, validationResult } = require('express-validator')
const validation = require('../middleware/validate')
exports.list_all_comments = async (req, res, next) => {
	try {
		const comment_list = await Comment.find();
		res.json(comment_list);
	} catch (error) {
		error.statusCode = 404;
		next(error);
	}
};

exports.get_comment = async (req, res, next) => {
	try {
		const comment = await Comment.findById(req.params.commentId).exec();
		return res.json(comment);
	} catch (err) {
		err.statusCode = 400;
		next(err);
	}
};

exports.create_comment = [

	body('Content', 'Content must not be blank').trim().isLength({ min: 1 }).escape(),
	body('Author', 'Author must not be blank').trim().isLength({ min: 1 }).escape(),
	validation,
	async (req, res, next) => {

		try {
			const comment = await Comment.create({
				content: req.body.content,
				author: req.body.author,
			});
			return res.json(comment);
		} catch (err) {
			err.statusCode = 400;
			next(err);
		}
	}

];

exports.edit_comment = [


	body('Content', 'Content must not be blank').trim().isLength({ min: 1 }).escape(),
	validation,
	async (req, res, next) => {
		try {
			const comment = await Comment.findByIdAndUpdate(req.params.commentId, {
				content: req.body.content,
			});
			return res.json(comment);
		} catch (err) {
			err.statusCode = 400;
			next(err);
		}
	}

];

exports.delete_comment = async (req, res, next) => {
	try {
		const deleted_comment = await Comment.findByIdAndDelete(req.params.commentId);
		return res.json(deleted_comment);
	} catch (err) {
		err.statusCode = 400;
		next(err);
	}
};
