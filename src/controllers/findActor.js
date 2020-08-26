import helpers from "../helpers";

/* Find given actor's degree of separation from Kevin Bacon using BFS.
Returns 3 responses based on degree value */
export async function findActor(req, res) {
	const actorName = req.params.actorName;
	const degree = helpers.breadthFirstSearch(actorName);
	let response =
		degree == 0
			? { result: "You entered Kevin Bacon himself." }
			: degree == null
			? { result: "Please try another actor name." }
			: {
					result: "Shortest path found for a given actor.",
					degreesOfSeparation: degree,
			  };
	return res.json(response);
}

export default { findActor };
