import bdt from '../assets/pieces/bdt.svg'
import kdt from '../assets/pieces/kdt.svg'
import klt from '../assets/pieces/klt.svg'
import ndt from '../assets/pieces/ndt.svg'
import nlt from '../assets/pieces/nlt.svg'
import qlt from '../assets/pieces/qlt.svg'
import qdt from '../assets/pieces/qdt.svg'
import blt from '../assets/pieces/blt.svg'
import rlt from '../assets/pieces/rlt.svg'
import rdt from '../assets/pieces/rdt.svg'
import plt from '../assets/pieces/plt.svg'
import pdt from '../assets/pieces/pdt.svg'


export const asciiToPieces = (asciiBoard) => {
    const pieceMap = {
      'r': { pieceName: 'rook dark', image: rdt },
      'n': { pieceName: 'knight dark', image: ndt },
      'b': { pieceName: 'bishop dark', image: bdt },
      'q': { pieceName: 'queen dark', image: qdt },
      'k': { pieceName: 'king dark', image: kdt },
      'p': { pieceName: 'pawn dark', image: pdt },
      'R': { pieceName: 'rook light', image: rlt },
      'N': { pieceName: 'knight light', image: nlt },
      'B': { pieceName: 'bishop light', image: blt },
      'Q': { pieceName: 'queen light', image: qlt },
      'K': { pieceName: 'king light', image: klt },
      'P': { pieceName: 'pawn light', image: plt },
    };
  
    const newPieces = [];
    const rows = asciiBoard.split("\n").slice(1, 9); // Extract only board rows
  
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i].match(/\S{1,2}/g); // Extract symbols from row
      if (!row) continue;
  
      for (let j = 0; j < row.length; j++) {
        const symbol = row[j].trim();
        if (symbol !== '.' && pieceMap[symbol]) {
          newPieces.push({
            key: `${j-2},${i}`,
            pieceName: pieceMap[symbol].pieceName,
            image: pieceMap[symbol].image,
            x: j-2,
            y: i
          });
        }
      }
    }
  
    return newPieces;
}