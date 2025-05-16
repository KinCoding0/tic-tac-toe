import { useState } from "react";
import "./App.css";
function Square({ handleClick, value }) {
	let setColor = null;
	if (value === "o") {
		setColor = "#f1b237";
	} else {
		setColor = "#31c3c0";
	}
	return (
		<button
			className="square"
			onClick={handleClick}
		>
			<span
				className="point"
				style={{ color: setColor }}
			>
				{value}
			</span>
		</button>
	);
}
function App() {
	const [square, setSquare] = useState(Array(9).fill(null));
	const [icon, setIcon] = useState(false);
	const [history, setHistory] = useState([]);
	const currentSquare = history.length - 1;

	function handlePlay(nextSquare) {
		setSquare(nextSquare);
		setIcon(!icon);
		setHistory([...history, nextSquare]);
	}
	return (
		<div className="container">
			<Aboard
				square={square}
				icon={icon}
				handlePlay={handlePlay}
				handleReset={handleReset}
				handleReturn={handleReturn}
			/>
		</div>
	);
	function handleReset() {
		setHistory([]);
		setSquare(Array(9).fill(null));
		setIcon(false);
	}
	function handleReturn() {
		if (currentSquare <= 0) {
			return;
		} else {
			setIcon(!icon);

			let preSquare = history.slice();
			setHistory(preSquare.slice(0, currentSquare));
			setSquare(preSquare[currentSquare - 1]);
		}
	}
}

function Aboard({ square, icon, handlePlay, handleReset, handleReturn }) {
	function handleClick(i) {
		let nextSquare = square.slice();
		if (nextSquare[i] || gameWinner(square)) {
			return;
		}

		if (icon) {
			nextSquare[i] = "o";
		} else {
			nextSquare[i] = "x";
		}
		handlePlay(nextSquare);
	}
	return (
		<>
			<button
				className="reset"
				onClick={handleReset}
			>
				reset
			</button>
			<button
				className="return"
				onClick={handleReturn}
			>
				<i className="fa-solid fa-repeat"></i>
			</button>
			<div className="iconGame">
				<span
					className="title"
					style={{ color: "#31c3c0" }}
				>
					x
				</span>
				<span
					className="title"
					style={{ color: "#f1b237" }}
				>
					o
				</span>
			</div>
			<div className="turn">{icon ? "o" : "x"}:turn</div>
			<div className="table">
				<Square
					value={square[0]}
					handleClick={() => {
						handleClick(0);
					}}
				/>
				<Square
					value={square[1]}
					handleClick={() => {
						handleClick(1);
					}}
				/>
				<Square
					value={square[2]}
					handleClick={() => {
						handleClick(2);
					}}
				/>
				<Square
					value={square[3]}
					handleClick={() => {
						handleClick(3);
					}}
				/>
				<Square
					value={square[4]}
					handleClick={() => {
						handleClick(4);
					}}
				/>
				<Square
					value={square[5]}
					handleClick={() => {
						handleClick(5);
					}}
				/>
				<Square
					value={square[6]}
					handleClick={() => {
						handleClick(6);
					}}
				/>
				<Square
					value={square[7]}
					handleClick={() => {
						handleClick(7);
					}}
				/>
				<Square
					value={square[8]}
					handleClick={() => {
						handleClick(8);
					}}
				/>
			</div>
			<div className="result">
				{gameWinner(square) ? `${gameWinner(square)} winner` : ""}
			</div>
		</>
	);
}
function gameWinner(square) {
	const winner = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < winner.length; i++) {
		const [a, b, c] = winner[i];
		if (square[a] && square[a] === square[b] && square[a] === square[c]) {
			console.log(square[a] + " " + square[b] + " " + square[c]);
			return square[a];
		}
	}
	return null;
}
export default App;
