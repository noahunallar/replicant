import models from "../models";
import * as fs from "fs";
import * as csv from "csv-parser";

let graph = null;

// Filters each row element in a given .csv file
function filterCast(element) {
	try {
		let title = element.id;
		let cast = JSON.parse(
			element.cast.replace(/'/g, '"').replace(/None/g, "null")
		);
		cast = cast.map((e) => e.name);

		return {
			title: title,
			cast: cast,
		};
	} catch (error) {}
}

// Reads the data from credits.csv file and initialize graph database
export async function setupDatabase() {
	const rows = [];
	fs.createReadStream("src/data/credits.csv")
		.pipe(csv.default())
		.on("data", (data) => rows.push(data))
		.on("end", () => {
			let movies = rows.map(filterCast).filter((e) => e != undefined);
			graph = new models.Graph();
			for (var i = 0; i < movies.length; i++) {
				let movie = movies[i].title;
				let cast = movies[i].cast;
				let movieNode = new models.Node(movie);
				graph.addNode(movieNode);
				for (var j = 0; j < cast.length; j++) {
					let actor = cast[j];
					actor = actor.toLowerCase();
					let actorNode = graph.getNode(actor);
					if (actorNode == undefined) {
						actorNode = new models.Node(actor);
					}
					graph.addNode(actorNode);
					movieNode.addEdge(actorNode);
				}
			}
		});
}

// Returns graph database
export function getDatabase() {
	return graph;
}

export default { setupDatabase, getDatabase };
