import React from "react";
import Tracks from "../tracks/Tracks.js";
import Search from "../tracks/Search.js";

export default function Index() {
	return (
		<React.Fragment>
			<Search />
			<Tracks />
		</React.Fragment>
	);
}
