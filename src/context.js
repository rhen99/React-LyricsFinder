import React, { useState, useEffect } from "react";
import axios from "axios";
export const Context = React.createContext();
export function Provider(props) {
	const [globalState, setGlobalState] = useState({
		track_list: [],
		heading: "Top 10 Tracks",
	});

	const reducer = (state, action) => {
		switch (action.type) {
			case "SEARCH_TRACKS":
				return {
					...state,
					track_list: action.payload,
					heading: "Search Results",
				};
			default:
				return state;
		}
	};

	useEffect(() => {
		axios
			.get(
				`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=ph&f_has_lyrics=1&apikey=${
					process.env.REACT_APP_MM_KEY
				}`,
			)
			.then(res => {
				//console.log(res.data);
				setGlobalState({
					...globalState,
					track_list: res.data.message.body.track_list,
				});
			})
			.catch(err => console.log(err));
	}, []);

	return (
		<Context.Provider
			value={{
				globalState,
				dispatch: action => setGlobalState(state => reducer(state, action)),
			}}
		>
			{props.children}
		</Context.Provider>
	);
}
