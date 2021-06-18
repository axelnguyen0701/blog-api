const { DateTime } = require('luxon');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	content: { type: String, required: true, maxLength: 100 },
	author: { type: Schema.Types.ObjectId, ref: "User", required: true },
	date: { type: Date, default: Date.now }
})

CommentSchema
	.virtual('formatted_date')
	.get(function () {
		return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
	})

CommentSchema
	.virtual('url')
	.get(function () {
		return '/comments/' + this._id;
	})

module.exports = mongoose.model('Comment', CommentSchema);