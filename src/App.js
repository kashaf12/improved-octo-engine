/** @format */

import logo from "./logo.svg";
import "./App.css";
import Parent from "./Parent";

function App() {
	return (
		<div
			className='App'
			style={{
				display: "flex",
				flexDirection: "column",
				marginTop: "100px",
			}}>
			<Parent />
		</div>
	);
}

export default App;
