import { recomendation } from "./utility/item_recommendation.js";
import express from "express";
import mongoose from "mongoose";

// Packages
// const mongoose = require("mongoose");
const app = express();

// Middleware
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.get("/", (req, res) => {
	res.send("Hello There");
});

app.get("/itemlist", (req, res) => {
	res.json(recomendation(req.body.message));
});

const port = process.env.port || 8000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
