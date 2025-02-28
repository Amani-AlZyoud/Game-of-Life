# Conway's Game Of Life

This repository contains an implementation of Conway's Game of Life. The Game of Life is a cellular automaton devised by mathematician John Conway. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input.

## Description

The Game of Life consists of a grid of cells, each of which can be alive or dead. The state of the grid evolves in discrete time steps according to a set of rules based on the states of neighboring cells. The rules are as follows:
1. Any live cell with fewer than two live neighbors dies (underpopulation).
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies (overpopulation).
4. Any dead cell with exactly three live neighbors becomes a live cell (reproduction).

## How to Run the Code

To run the Game of Life after cloning the repository, follow these steps:

1. **Clone the repository:**
    ```sh
    git clone https://github.com/Amani-AlZyoud/Game-of-Life
    cd game-of-life
    ```

2. **Install dependencies:**
    If the project requires any dependencies, install them using the following command:
    ```sh
    npm install
    ```

3. **Run the website:**
    ```sh
    npm run build
    ```
   ```sh
    npm run start
    ```



## Play the Game

Experience Conway's Game of Life in action by visiting our live demo:

[![Play Conway's Game of Life](https://img.shields.io/badge/Play-Conway's_Game_of_Life-brightgreen)](https://con-way-game-of-life.netlify.app/)

**Enjoy the Game! ^_^** 


<p align="center">
    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Conway%27s_firework.gif" alt="Conway's Game of Life">
</p>

