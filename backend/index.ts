import { recomendation } from "./utility/item_recommendation";
import express from "express";
import * as sqlite3 from "sqlite3";

// import { insertDummyData, createDatabase } from "./db/testInsert";
import { data } from "./db/data";

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

const port = process.env.port || 8000;

// let db = new sqlite3.Database("./db/storage.db", (err) => {
// 	if (err) {
// 		console.error(err.message);
// 	} else {
// 		console.log("Connected to database.");

// 		app.listen(port, () => {
// 			console.log(`Server is running on port ${port}`);
// createDatabase(db);
// insertDummyData(db);
// let sql = `SELECT * FROM items`;
// const items: any = db.all(sql, [], (err, rows) => {
// 	if (err) {
// 		throw err;
// 	}
// 	return rows;
// 		});
// 	}
// });

app.get("/", (req, res) => {
	res.send("Hello There");
});

app.get("/itemlist", (req, res) => {
	res.json(recomendation(req.body.message, data));
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
