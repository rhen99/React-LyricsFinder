import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
import Spinner from "../layouts/Spinner";
export default function Lyrics({ match }) {
	const [track, setTrack] = useState({});
	const [lyrics, setLyrics] = useState({});
	useEffect(() => {
		axios
			.get(
				`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
					match.params.id
				}&apikey=${process.env.REACT_APP_MM_KEY}`,
			)
			.then(res => {
				//console.log(res.data);
				setLyrics(res.data.message.body.lyrics);

				return axios
					.get(
						`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${
							match.params.id
						}&apikey=${process.env.REACT_APP_MM_KEY}`,
					)
					.then(res => setTrack(res.data.message.body.track))
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
	}, []);

	if (
		track === undefined ||
		lyrics === undefined ||
		Object.keys(track).length === 0 ||
		Object.keys(lyrics).length === 0
	) {
		return <Spinner />;
	} else {
		return (
			<>
				<Link to="/" className="btn btn-dark btn-sm mb-4">
					Go Back
				</Link>
				<div className="card">
					<h5 className="card-header">
						{track.track_name} by{" "}
						<span className="text-secondary">{track.artist_name}</span>
					</h5>
					<div className="card-body">
						<p className="card-text">{lyrics.lyrics_body}</p>
					</div>
				</div>
				<ul className="list-group">
					<li className="list-group-item">
						<strong>Album_ID</strong>: {track.album_id}
					</li>
					<li className="list-group-item">
						<strong>Genre</strong>:{" "}
						{
							track.primary_genres.music_genre_list[0].music_genre
								.music_genre_name
						}
					</li>
					<li className="list-group-item">
						<strong>Explicit Words</strong>:{" "}
						{track.explicit === 0 ? "No" : "Yes"}
					</li>
					<li className="list-group-item">
						<strong>First Release Date</strong>:{" "}
						<Moment format="MMMM DD, YYYY">{track.first_release_date}</Moment>
					</li>
				</ul>
			</>
		);
	}
}
