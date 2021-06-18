const post = require('../models/post');
const Post = require('../models/post');
const User = require('../models/user');
exports.list_all_posts = async (req, res, next) => {
	try {
		const post_list = await Post.find();
		return res.json(post_list);
	} catch (error) {
		error.statusCode = 400;
		next(error);
	}
}

exports.get_post = async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.postId).exec();
		return res.json(post);
	} catch (error) {
		error.statusCode = 400;
		next(error);
	}
}
exports.create_new_post = async (req, res, next) => {
	try {
		const user = await User.findOne({ username: 'axelnguyen0701' }).exec();
		const post = {
			title: req.body.title,
			content: req.body.content,
			author: user,
			published: req.body.publish
		}
		const post_DB = await Post.create(post)
		return res.json(post_DB)
	} catch (err) {
		error.statusCode = 400;

		return next(err)
	}
}

exports.edit_post = async (req, res, next) => {
	try {
		const post_DB = await Post.findByIdAndUpdate(req.params.postId, { title: req.body.title, content: req.body.content }).exec();
		return res.json(post_DB)
	} catch (err) {
		error.statusCode = 400;
		return next(err)
	}
}

exports.delete_post = async (req, res, next) => {
	try {
		const post = await Post.findByIdAndDelete(req.params.postId);
		return res.json(post)
	} catch (error) {
		error.statusCode = 400;
		return next(err)
	}
}