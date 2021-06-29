const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");
const Comment = require("./comment");

const PostSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  published: { type: Boolean, required: true }, //Clients will take care to show published or not
});

PostSchema.virtual("formatted_date").get(function () {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

PostSchema.virtual("url").get(function () {
  return "/posts/" + this._id;
});

PostSchema.pre("remove", async function () {
  console.log("hello");
  let id = this._id;
  await Comment.deleteMany({ post: id });
});

PostSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Post", PostSchema);
