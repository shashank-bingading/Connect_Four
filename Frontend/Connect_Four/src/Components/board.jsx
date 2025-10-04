import React from 'react'
import '../styles/board.css'
import { useState } from 'react';

const Board = () => {
    const rows = 6;
    const cols = 7;
    const [board, setBoard] = useState(
        Array(rows).fill(null).map(() => Array(cols).fill(null))
    );
    const [currentPlayer, setCurrentPlayer] = useState("R");

    const handleClickCell = (colIndex) => {
        for(let row = rows - 1; row >= 0; row--){
            if(!board[row][colIndex]){
                const newBoard = board.map(ro => [...ro]);
                newBoard[row][colIndex] = currentPlayer;
                setBoard(newBoard); 
                setCurrentPlayer(currentPlayer === "R" ? "Y" : "R");
                break;
            }};

   
    
  return (
    <div style={{justifyContent:'center',alignItems:'center'}}>
        <h1>Connect Four Board</h1>
        <div className='board'>
        {Array.from({length: rows}).fill(0).map((a,rowindex)=>(
            <div key={rowindex} className='row'>
                {Array(cols).fill(0).map((b,colindex)=>(
                    <div key={colindex} className='col'
                    onClick={()=>handleClickCell(colindex)}>
                        {b == "R" && <div className='red-disc'></div>}
                        {b == "Y" && <div className='yellow-disc'></div>}
                    </div>
                ))}
            </div>
        ))}
        </div>
      
    </div>
  )
}}

export default Board
