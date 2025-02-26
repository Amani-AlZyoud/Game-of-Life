"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const createEmptyGrid = (numRows, numCols) =>
    Array.from({ length: numRows }, () => Array(numCols).fill(0));

export default function GameOfLife() {
    const [rows, setRows] = useState(30); 
    const [cols, setCols] = useState(30); 
    const [grid, setGrid] = useState(createEmptyGrid(rows, cols));
    const [running, setRunning] = useState(false);
    const [speed, setSpeed] = useState(1000);

    const speedLevels = [
        { label: "0.5x", value: 2000 },
        { label: "1x", value: 1000 },
        { label: "2x", value: 500 },
        { label: "4x", value: 250 },
    ];

    const getNextGeneration = (grid: number[][]) => {
        return grid.map((row, r) =>
            row.map((cell, c) => {
                const neighbors = [
                    [r - 1, c - 1], [r - 1, c], [r - 1, c + 1],
                    [r, c - 1], /* CURRENT CELL */[r, c + 1],
                    [r + 1, c - 1], [r + 1, c], [r + 1, c + 1]
                ];
                const aliveNeighbors = neighbors.reduce((acc, [x, y]) => {
                    return acc + (grid[x]?.[y] || 0);
                }, 0);

                if (cell === 1 && (aliveNeighbors < 2 || aliveNeighbors > 3)) return 0;
                if (cell === 0 && aliveNeighbors === 3) return 1;
                return cell;
            })
        );
    };

    useEffect(() => {
        if (!running) return;
        const interval = setInterval(() => {
            setGrid((g) => getNextGeneration(g));
        }, speed);
        return () => clearInterval(interval);
    }, [running, speed, rows, cols]);

    
    return (
        <div className="flex flex-col items-center p-4 pixel-font" style={{ backgroundColor: "url('../public/texture.png')", backgroundSize: "cover" }}>
            <h1 className="text-7xl mb-4 stroke-yellow-400 stroke-2">Game of Life</h1>

            {/* Game Controls */}
            <div className="flex gap-3 mb-4">
                <button className="pixel-btn bg-black text-green-600 text-3xl border-green-600 rounded-lg border-2 p-2" onClick={() => setRunning(!running)}>
                {running ? "Pause" : "Start"}
                </button>
                <button className="pixel-btn bg-black text-red-800 text-3xl corner-button rounded-lg border-red-800 border-2 p-2" onClick={() => {
                    setGrid(createEmptyGrid(rows, cols));
                    setRunning(false);
                }
                }>
                    Stop
                </button>
            </div>

            {/* Speed Control */}
            <div className="flex flex-col items-center gap-2 mb-4">
                <div className="flex gap-4 text-2xl">
                    Speed: {speedLevels.map(({ label, value }) => (
                        <button
                            key={value}
                            className={`pixel-btn ${speed === value ? "selected" : ""} ${speed == value ? "text-white" : "text-orange-500"}`}
                            onClick={() => {setSpeed(value);}}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid-container bg-black">
                {grid.map((row, r) => (
                    <div key={r} className="grid-row">
                        {row.map((cell, c) => (
                            <div
                                key={`${r}-${c}`}
                                className={`grid-cell ${cell ? "alive" : ""}`}
                                onClick={() => {
                                    const newGrid = [...grid];
                                    newGrid[r][c] = grid[r][c] ? 0 : 1;
                                    setGrid(newGrid);
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
