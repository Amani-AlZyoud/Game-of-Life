'use client'
import { useState, useEffect } from 'react';
import styles from './GameSection.module.css';
const createGrid = (rows: number, cols: number) => {
  return Array.from({ length: rows }, () => Array(cols).fill(0)); // 2D array of Dead cells
};

const GameSection = () => {
  const [rows, setRows] = useState(10); // Default rows
  const [cols, setCols] = useState(10); // Default columns
  const [grid, setGrid] = useState(createGrid(rows, cols)); // The grid itself
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000); // Default speed (1 second per generation)
  const [jsonInput, setJsonInput] = useState(''); // JSON input string
  const [error, setError] = useState('');
  
  
  const speedLevels = [
    { label: "0.5x", value: 2000 },
    { label: "1x", value: 1000 },
    { label: "2x", value: 500 },
    { label: "4x", value: 250 },
  ];

 

  // Function to calculate the next generation based on the rules
  const nextGeneration = () => {
    const newGrid = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        const neighbors = [
          [-1, -1], [-1, 0], [-1, 1],
          [0, -1], [0, 1],
          [1, -1], [1, 0], [1, 1],
        ];

        const AliveNeighbors = neighbors.reduce((count, [dx, dy]) => {
          const x = rowIndex + dx;
          const y = colIndex + dy; // 3 x 3 
          if (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length) {
            return count + (grid[x][y] === 1 ? 1 : 0);
          }
          return count;
        }, 0);

        if (cell === 1) {
          return AliveNeighbors === 2 || AliveNeighbors === 3 ? 1 : 0;
        } else {
          return AliveNeighbors === 3 ? 1 : 0;
        }
      })
    );
    setGrid(newGrid);
  };

  // Effect to run the simulation
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => nextGeneration(), speed);
    } else if (!isRunning && interval) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, grid, speed]);

  
  const handleFileLoad = (event) => {
    const file = event.target?.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        setJsonInput(json); // Update state with the loaded JSON
        if (!Array.isArray(json) || !json.every(row => Array.isArray(row))) {
          throw new Error('Invalid JSON format. Must be a 2D array.');
        }
  
        setRows(json.length);
        setCols(json[0].length);
        setGrid(json);
        setError('');
      } catch (error) {
        console.error("Invalid JSON file");
      }
    };
    
    reader.readAsText(file);
  
    // Reset input to allow re-uploading the same file
    event.target.value = "";
  };

  // Function to clear the grid
  const StopRunning = () => {
    setGrid(createGrid(rows, cols));
    setIsRunning(false);
  };

  // Render the grid and the controls
  return (
    <div className="flex flex-col items-center p-4 pixel-font" style={{ backgroundColor: "url('../public/texture.png')", backgroundSize: "cover" }}>
      <h1 className={styles.text}>Game of Life</h1>

      {/* Game Controls */}
      <div className="flex gap-3 mb-4">
        <button className="pixel-btn bg-black text-green-600 text-3xl border-green-600 rounded-lg border-2 p-2" onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button className="pixel-btn bg-black text-red-800 text-3xl corner-button rounded-lg border-red-800 border-2 p-2" onClick={() => {
          setGrid(createGrid(rows, cols));
          setIsRunning(false);
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
              onClick={() => { setSpeed(value); }}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="p-4 rounded-lg">
        <div className="relative flex flex-row bg-inherit gap-3">
  <label htmlFor="rows">Rows Number: </label>
  <input
    type="number"
    id="rows"
    name="rows"
    className="peer h-10 w-14 rounded-lg text-white bg-black placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-yellow-600 focus:outline-none focus:border-rose-600"
    placeholder="Rows Number"
    value={rows}
    min={1}
    onChange={(e) => {
      const value = parseInt(e.target.value) || 1; // Ensure a valid number
      setRows(value);
      setGrid(createGrid(value, cols)); // Update grid with new row count
      setIsRunning(false);
    }}
  />

  <label htmlFor="columns">Columns Number: </label>
  <input
    type="number"
    id="columns"
    name="columns"
    className="peer h-10 w-14 rounded-lg text-white bg-black placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-yellow-600 focus:outline-none focus:border-rose-600"
    placeholder="Columns Number"
    value={cols}
    min={1}
    onChange={(e) => {
      const value = parseInt(e.target.value) || 1; // Ensure a valid number
      setCols(value);
      setGrid(createGrid(rows, value)); // Update grid with new column count
      setIsRunning(false);
    }}
  />
</div>


        <label htmlFor="jsonFile">Load Setup: </label><input type="file" accept=".json" id="jsonfile" name="jsonfile" className="peer h-10 w-13 px-2 mt-3 ring-gray-500 focus:ring-yellow-600 focus:outline-none focus:border-rose-600" onChange={(e) => handleFileLoad(e)} />
    
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
};

export default GameSection;
