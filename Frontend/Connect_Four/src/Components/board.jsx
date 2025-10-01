import React from 'react'
import '../styles/board.css'

const Board = () => {
    const rows = 6;
    const cols = 7;
  return (
    <div style={{justifyContent:'center',alignItems:'center'}}>
        <h1>Connect Four Board</h1>
        <div className='board'>
        {Array.from({length: rows}).fill(0).map((a,rowindex)=>(
            <div key={rowindex} className='row'>
                {Array(cols).fill(0).map((b,colindex)=>(
                    <div key={colindex} className='col'></div>
                ))}
            </div>
        ))}
        </div>
      
    </div>
  )
}

export default Board
