// setup express, config file, and postgres
const express = require('express');
const app = express();
const config = require('./config');
const pg = require('pg');

// setup postgres
const pool = new pg.Pool(config.postgres);
const client = pool.connect();
// setup express
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));
// app.get /db?auth=authkey&tag=something&query=SQL to query postgres
app.get('/db', async (req, res) => {
	try {
		// Check that all the required parameters are there
		if (!req.query.auth || !req.query.query) {
			res.send("Missing parameters");
			return;
		}
		// Check the ?auth key
		if (req.query.auth !== config.authKey) {
			res.send("Invalid auth key");
			return;
		}
		// Execute the query straight from the url

		(await client).query(req.query.query)
			.then(result => {
				out = {
					"tag": req.query.tag || null,
					"rows": result.rows,
					"rowCount": result.rowCount
				}
				res.send(out);
			}).catch(err => {
				// format the error as a json object
				out = {
					"tag": req.query.tag || null,
					"error": err.toString(),
					"info": err
				}
				res.send(out);
			})
	} catch (err) {
		// format the error as a json object
				out = {
					"tag": req.query.tag || null,
					"error": err.toString(),
					"info": err
				}
				res.send(out);
	}
});

// start server
app.listen(config.port, () => {
	console.log(`Server running on port ${config.port}`);
});