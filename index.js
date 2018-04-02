const express = require('express')
var bodyParser = require('body-parser')
const simpleGit = require('simple-git')()


// API methods
const api = require('./api')

// Creating an App
const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/donations', async (req, res) => {
	res.json({
		backers: await api.backers(),
		pledged: await api.getTotalFunded()
	})
})
app.post('/donation', (req, res) => {
	api.saveDonation(req.body)
	res.json({
		status: 'OK'
	})
})

app.get('/export', async (req, res) => {
	res.set('Content-Type', 'text/plain')
	let donations = await api.exportDonations()
	res.send(new Buffer(donations))
})

app.get('/update', async (req, res) => {
	simpleGit.pull('origin')
	res.send('OK')
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`GetUpStandUp API listening on port ${PORT}!`))