import React from "react";
import loader from "./spinner.gif";

export default function Spinner() {
	return (
		<div>
			<img
				src={loader}
				alt="Loading..."
				style={{ display: "block", margin: "40px auto", width: "200px" }}
			/>
		</div>
	);
}
