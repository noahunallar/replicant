import { getDatabase } from "./database";

// Search actor name in using BFS algorithm in a graph initialized during server start
export default function breadthFirstSearch(actorName) {
	let name = actorName.toLowerCase().split("_").join(" ");
	let graph = getDatabase();
	graph.reset();
	let start = graph.setStart("kevin bacon");
	try {
		let end = graph.setEnd(name);

		let queue = [];

		start.searched = true;
		queue.push(start);

		while (queue.length > 0) {
			var current = queue.shift();
			if (current == end) {
				break;
			}
			var edges = current.edges;
			for (var i = 0; i < edges.length; i++) {
				var neighbor = edges[i];
				if (!neighbor.searched) {
					neighbor.searched = true;
					neighbor.parent = current;
					queue.push(neighbor);
				}
			}
		}

		var path = [];
		path.push(end);
		var next = end.parent;
		while (next != null) {
			path.push(next);
			next = next.parent;
		}

		return Math.floor(path.length / 2);
	} catch (error) {
		return null;
	}
}
