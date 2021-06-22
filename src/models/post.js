const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");
const PostSchema = new Schema({
  title: { type: String, required: String, maxLength: 100 },
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

PostSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Post", PostSchema);
