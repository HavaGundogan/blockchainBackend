const express = require('express');
const app = express();
const cors = require('cors');
require('./db');
const UserTable = require('./models').UserTable;
const PostTable = require('./models').PostTable;
const User_Posts = require('./models').User_Posts;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
require('dotenv').config();
const uploader = require('./multer');

const cloudinary = require('cloudinary').v2;
// Configuration
cloudinary.config({
	cloud_name: 'dciiykjm4',
	api_key: '149877961395173',
	api_secret: 'E2zHLwc9XOC2ZpK5Neq37pD0Rz8',
});

app.use(
	cors({
		origin: '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		preflightContinue: false,
		optionsSuccessStatus: 204,
	})
);

app.use(express.json());

app.post('/user', async function (req, res) {
	const { email, password, fullName, city, diseaseName } = req.body;

	try {
		const response = UserTable.create({ email, password, fullName, city, diseaseName });

		if (response) {
			res.status(200).json(response);
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({ hata: error });
	}
});

app.post('/post', uploader.single('file'), async function (req, res) {
	const { email, comment, photo } = req.body;

	try {
		const user = UserTable.find({
			where: {
				email: email,
			},
		});

		if (!user) {
			return res.status(404).json({ hata: 'Kullanici Bulunamadi' });
		}

		const upload = await cloudinary.v2.uploader.upload(req.file.path);

		const response = PostTable.create({ email, comment, photo: upload.secure_url });

		if (response) {
			res.status(200).json(response);
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({ hata: error });
	}
});

app.get('/user', async function (req, res) {
	const { email } = req.body;

	try {
		const user = UserTable.find({
			where: {
				email: email,
			},
		});

		res.status(200).json(user);
	} catch (error) {
		console.log(error);
	}
});
app.get('/posts', async function (req, res) {
	try {
		const posts = await PostTable.findAll({
			order: [['createdAt', 'ASC']],
			attributes: { exclude: ['UserPostId'] },
			include: {
				model: UserTable,
				through: User_Posts,
				attributes: { exclude: ['UserPostId', 'User_Posts', 'password'] },
			},
		});

		res.status(200).json(posts);
	} catch (error) {
		console.log(error);
	}
});
app.listen(process.env.SERVER_PORT);
