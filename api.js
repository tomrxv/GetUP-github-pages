const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)


// Write default content into DB
db.defaults({ donations: [], count: 0 }).write()


const getDonations = async () => {
	return db.get('donations').value()
}

const getTotalFunded = async () => {
	let donations = await getDonations()
	return donations.reduce((a, b) => a + b.amount, 0)
}

const saveDonation = async ({firstname, lastname, email, amount}) => {
	amount = Number(amount)
	db.get('donations').push({
		firstname,
		lastname,
		email,
		amount,
		date: new Date()
	}).write()

	db.update('count', n => n + 1).write()
}

const backers = () => {
	return db.get('count').value()
}

const exportDonations = async () => {
	let donations = await getDonations()
	let data = "firstname;lastname;email;donation;date\r\n"
	for(let donation of donations) {
		let date = new Date(donation.date)
		data += `${donation.firstname};${donation.lastname};${donation.email};${date.toLocaleDateString()}\r\n`
	}
	return data
}

exports.getDonations = getDonations
exports.backers = backers
exports.getTotalFunded = getTotalFunded
exports.saveDonation = saveDonation
exports.exportDonations = exportDonations