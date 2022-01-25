const client = require("mongodb").MongoClient
const url = 'mongodb://localhost:27017/first'


const errorChecker = (err, instance) => {
	if (err) {
		console.log(err)
	} else {
		console.log("Good to go")
		console.log(instance)
	}
}

const createCollection = (name) => {
	client.connect(url, (error, instance) => {
		if (error) {
			throw error
		} else {
			const db = instance.db('first')
			db.createCollection(name, errorChecker)
		}
	})
}

const insert = (obj) => {
	client.connect(url, (error, instance) => {
		if (error) {
			throw error
		} else {
			const db = instance.db('first')
			db.collection('users').insertMany(obj, errorChecker)

		}
	})
}

insert([
	{name: "Mg MG", email: "mgmg@gmail.com", age: 123},
	{name: "Mg MG", email: "mgmg@gmail.com", age: 123, adresss: "Letpadan"},
	{name: "Mg MG", email: "mgmg@gmail.com", age: 123},
	{name: "Mg MG", email: "mgmg@gmail.com", age: 123},
])