const mongoose = require("mongoose");
const models = require("./models/index");
const bcrypt = require("bcryptjs");
require("dotenv").config();
//MONGO STUFF
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", (req, res) => {
  console.log("Mongoose connected");
});

async function seedUsers() {
  await models.Post.deleteMany({});
  await models.User.deleteMany({});
  await models.Comment.deleteMany({});
  const user1 = {
    username: "axelnguyen0701",
    first_name: "Hieu",
    last_name: "Nguyen",
    password: bcrypt.hashSync("secretpassword", 8),
  };
  const user2 = {
    username: "axelnguyen0702",
    first_name: "Axel",
    last_name: "Nguyen",
    password: bcrypt.hashSync("secretpassword1", 8),
  };

  let user1_db = await models.User.create(user1);
  let user2_db = await models.User.create(user2);

  const post1 = {
    title: "How to create a new blog?",
    content:
      "Do ullamco fugiat ad ipsum qui reprehenderit et incididunt commodo ea consequat sit.\n Pariatur irure ut minim esse ad magna voluptate.\n Est nisi eiusmod proident tempor excepteur nostrud ad non pariatur.\n Qui consequat quis occaecat fugiat esse ea qui non aliquip cillum. Non veniam cillum duis sint incididunt eu est adipisicing aute consectetur amet culpa irure sint.Tempor consectetur et ex enim labore nisi elit magna enim eu esse ipsum proident minim. Labore est velit deserunt eiusmod fugiat incididunt id minim adipisicing tempor consequat reprehenderit non ipsum. Et reprehenderit consequat aute quis consequat proident labore.Ex ipsum sint esse pariatur enim pariatur id. Id cupidatat sit consectetur ipsum ipsum nulla esse est. Irure veniam irure ea proident mollit laborum. Est non eu enim veniam cupidatat exercitation duis. Aliqua commodo commodo eu excepteur laborum. Cupidatat voluptate ipsum ipsum labore ullamco fugiat Lorem nisi veniam. Cillum velit excepteur do amet nostrud pariatur nostrud.Pariatur quis do culpa consectetur consectetur est velit cupidatat reprehenderit cupidatat tempor cupidatat in consequat. Labore irure eiusmod commodo amet velit et ad occaecat nostrud cillum aliqua in. Ut ipsum cillum aliquip excepteur adipisicing voluptate nostrud. Consequat aute eu labore amet consectetur esse non adipisicing amet non et. Veniam duis sint eiusmod commodo proident laboris aliqua labore.Laboris laborum dolore irure voluptate eiusmod laborum dolore ipsum. Deserunt ad id ea sint Lorem ullamco enim. Velit qui tempor magna commodo magna commodo Lorem labore amet sint. Irure ea anim non nulla ullamco occaecat eu. Velit commodo exercitation ex ea sit sit excepteur velit commodo consequat. Ullamco ut nostrud Lorem deserunt magna fugiat ea irure pariatur commodo minim ut. In enim fugiat culpa reprehenderit laboris ullamco sint cillum qui elit cillum magna cupidatat",
    author: user1_db,
    published: false,
  };

  const post2 = {
    title: "How to create a new user?",
    content:
      "Do ullamco fugiat ad ipsum qui reprehenderit et incididunt commodo ea consequat sit.\n Pariatur irure ut minim esse ad magna voluptate.\n Est nisi eiusmod proident tempor excepteur nostrud ad non pariatur.\n Qui consequat quis occaecat fugiat esse ea qui non aliquip cillum. Non veniam cillum duis sint incididunt eu est adipisicing aute consectetur amet culpa irure sint.Tempor consectetur et ex enim labore nisi elit magna enim eu esse ipsum proident minim. Labore est velit deserunt eiusmod fugiat incididunt id minim adipisicing tempor consequat reprehenderit non ipsum. Et reprehenderit consequat aute quis consequat proident labore.Ex ipsum sint esse pariatur enim pariatur id. Id cupidatat sit consectetur ipsum ipsum nulla esse est. Irure veniam irure ea proident mollit laborum. Est non eu enim veniam cupidatat exercitation duis. Aliqua commodo commodo eu excepteur laborum. Cupidatat voluptate ipsum ipsum labore ullamco fugiat Lorem nisi veniam. Cillum velit excepteur do amet nostrud pariatur nostrud.Pariatur quis do culpa consectetur consectetur est velit cupidatat reprehenderit cupidatat tempor cupidatat in consequat. Labore irure eiusmod commodo amet velit et ad occaecat nostrud cillum aliqua in. Ut ipsum cillum aliquip excepteur adipisicing voluptate nostrud. Consequat aute eu labore amet consectetur esse non adipisicing amet non et. Veniam duis sint eiusmod commodo proident laboris aliqua labore.Laboris laborum dolore irure voluptate eiusmod laborum dolore ipsum. Deserunt ad id ea sint Lorem ullamco enim. Velit qui tempor magna commodo magna commodo Lorem labore amet sint. Irure ea anim non nulla ullamco occaecat eu. Velit commodo exercitation ex ea sit sit excepteur velit commodo consequat. Ullamco ut nostrud Lorem deserunt magna fugiat ea irure pariatur commodo minim ut. In enim fugiat culpa reprehenderit laboris ullamco sint cillum qui elit cillum magna cupidatat",
    author: user2_db,
    published: true,
  };

  const post1db = await models.Post.create(post1);
  const post2db = await models.Post.create(post2);

  const comment1 = {
    content: "Nice post!1",
    author: user1_db,
    post: post1db._id,
  };
  const comment2 = {
    content: "Not so nice1",
    author: user2_db,
    post: post1db._id,
  };
  const comment3 = {
    content: "Nice post!",
    author: user1_db,
    post: post2db._id,
  };
  const comment4 = {
    content: "Not so nice",
    author: user2_db,
    post: post2db._id,
  };

  await models.Comment.create([comment1, comment2]);
  await models.Comment.create([comment3, comment4]);
}

seedUsers();
