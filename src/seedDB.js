const mongoose = require('mongoose');
const models = require('./models/index');
require('dotenv').config();
//MONGO STUFF
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', (req, res) => {
	console.log("Mongoose connected")
})

async function seedUsers() {
	const user1 = {
		username: 'axelnguyen0701',
		first_name: 'Hieu',
		last_name: 'Nguyen',
		password: 'secretpassword',

	}
	const user2 = {
		username: 'axelnguyen0702',
		first_name: 'Axel',
		last_name: 'Nguyen',
		password: 'secretpassword1',

	}


	let user1_db = await models.User.create(user1);
	let user2_db = await models.User.create(user2);

	const post1 = {
		title: "How to create a new blog?",
		content: "Fugiat laborum amet cillum velit in occaecat occaecat tempor duis proident sunt ut. Exercitation quis pariatur nulla qui. Magna laborum aliquip eu nostrud et esse consectetur aliqua dolor. Consectetur proident irure quis irure dolore irure labore. Labore commodo proident esse ipsum. Sit occaecat eu do laborum eiusmod sunt deserunt consequat excepteur.",
		author: user1_db,
	}

	const post2 = {
		title: "How to create a new user?",
		content: "Irure ea consequat commodo sunt ex do ipsum proident ullamco sint sit occaecat. Ex et nostrud exercitation incididunt deserunt proident mollit non est consectetur Lorem nisi. Quis aliqua Lorem tempor duis labore irure aliqua tempor labore Lorem. Tempor exercitation mollit ea veniam reprehenderit exercitation aliquip sit et cupidatat.",
		author: user2_db,
	}

	await models.Post.create(post1);
	await models.Post.create(post2);

}

seedUsers();