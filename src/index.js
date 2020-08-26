import "dotenv/config";
import cors from "cors";
import express from "express";
import routes from "./routes";
import helpers from "./helpers";

const app = express();

// * Application-Level Middleware * //

// Third-Party Middleware

app.use(cors());

// Built-In Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware

// * Routes * //

app.use("/", routes.baconNumber);

// * Start * //

(async () => {
	// * Database Seeding * //
	await helpers.setupDatabase();
	app.listen(process.env.PORT, () =>
		console.log(`Example app listening on port ${process.env.PORT}!`)
	);
})();
