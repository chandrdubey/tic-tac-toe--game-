import React, { Component } from "react";
import Square from "./Square";
import { connect } from "react-redux";
class Board extends Component {
  constructor(props) {
    super(props);
      this.state = {
        squares: Array(9).fill(null),
           winner: null,
        totalMoves:0,
        game_over: 0
      }
  }

  // Handling the value of squres 

   handleSqureValue (index){
     if( this.props.squares[index]){
       return;
     }
    const newSquares = this.props.squares;
    newSquares[index] = this.props.selectedPlayer;

   // Updating the value of squares
    this.props.dispatch({
      type: "MOVE UPDATE",
      payload: newSquares,
    });
     

    //Checking  for winners
     let  checkWinner = calculateWinner(this.state.squares);
    if(checkWinner){
      this.setState({
        game_over: 1,
        winner:checkWinner
      });
      this.props.dispatch({
        type: "UPDATE SCORE OF X",
      });
      return;
    }

    // Cheecking for draw

    else if(this.state.totalMoves  === 8){
        this.setState({
          game_over:2
        })
        return;
    }
   // Computer makes the next move
   console.log(this.state.totalMoves);
   let computerPlayer = "0";

   if(this.props.selectedPlayer === computerPlayer){
    computerPlayer = "X";
   }

    
     
    const updatedSquares = computerMoves(newSquares,computerPlayer);
   // Updating the value of squares

   this.props.dispatch({
     type: "MOVE UPDATE",
     payload: updatedSquares,
   });

   this.setState({
     squares: this.props.squares,
     totalMoves : this.state.totalMoves+2
   });        
   console.log(this.state.totalMoves);

   //Checking  for winners
    checkWinner =calculateWinner(this.state.squares);
   if(checkWinner){
     this.setState({
       game_over: 1,
       winner:checkWinner
     });
     this.props.dispatch({
       type: "UPDATE SCORE OF 0",
     });
     return;
   }
   // Cheecking for the draw 
   else if(this.state.totalMoves  === 9){
       this.setState({
         game_over:2
       })
       return;
   }
   
  };

//Handle restart button
handleRestart = ()=>{

  //Updating reduxstates
  this.props.dispatch({
    type: "RESTART",
  });
  this.setState({
    squares: Array(9).fill(null),
        winner: null,
        totalMoves:0,
        game_over: 0
  })
} 
  renderSquare(i) {
    return (<Square value={this.state.squares[i]} keyValue={i} onClick ={() =>this.handleSqureValue(i)} />); 
  }
  render() {

    return (
      <>
      {this.state.game_over === 0 && (<div className="mx-auto board ">
        <div className="board-row text-center">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        </div>)} 
         {this.state.game_over === 1 && (
           <>
           <h4> {this.state.winner} WINNER! </h4> 
           <button className="btn btn-success" onClick={this.handleRestart}>Restart</button>
           </>)}
           {this.state.game_over === 2 && (<>
           <h4> DRAW </h4> 
           <button className="btn btn-success" onClick={this.handleRestart}>Restart</button></>)}
           
      </>
    );
  }
}
const mapStateToProps = ({squares }) => {
  return {
    squares
  };
};

const computerMoves = (squares,computerPlayer)=>{
   let tempSqures =[];
   //pushing all the unfilled square
   squares.map( (square,index)=>{
     if(square === null){
       tempSqures.push(index);
     }
   });
  
   // computer marks a random EMPTY squares
   const random = Math.ceil(Math.random()*tempSqures.length) - 1;
   let newSquares  = squares;

   newSquares[tempSqures[random]]  = computerPlayer;
   return  newSquares;
}
//Calaculate the winner                  
const calculateWinner =(squares)=> {

  const lines = [
    [0, 1, 2],                                               
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default connect(mapStateToProps)(Board);
