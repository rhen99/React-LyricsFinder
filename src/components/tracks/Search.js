import React, { useState, useContext } from "react";
import { Context } from "../../context";
import axios from "axios";

export default function Search() {
	const [trackTitle, setTrackTitle] = useState("");

	const value = useContext(Context);
	const { dispatch, globalState } = value;

	const findTrack = (dispatch, e) => {
		e.preventDefault();
		axios
			.get(
				`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${
					process.env.REACT_APP_MM_KEY
				}`,
			)
			.then(res => {
				dispatch({
					type: "SEARCH_TRACKS",
					payload: res.data.message.body.track_list,
				});
			})
			.catch(err => console.log(err));
	};

	return (
		<div className="card card-body mb-4 p-4">
			<h1 className="display-4 text-center">
				<i className="fas fa-music" /> Search For Music
			</h1>
			<p className="lead text-center">Get the lyrics for any song.</p>
			<form onSubmit={findTrack.bind(null, dispatch)}>
				<div className="form-group">
					<input
						placeholder="Song Title..."
						type="text"
						className="form-control form-control-lg"
						onChange={e => setTrackTitle(e.target.value)}
						name="trackTitle"
						value={trackTitle}
					/>
				</div>
				<button className="btn btn-primary btn-lg btn-block mb-5" type="submit">
					Search Song
				</button>
			</form>
		</div>
	);
}
