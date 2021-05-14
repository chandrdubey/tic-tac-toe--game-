import React, { Component } from 'react'
import Board from './components/Board';
import { connect } from "react-redux";
import "./App.css";

class App extends Component {
  constructor(){
    super()
       this.state ={
         player: null
       }
  }
  handleSelectPalayerX = ()=>{
      this.setState({
        player: "X"
      });
  }
  handleSelectPalayerO = ()=>{
    this.setState({
      player:"0"
    });
} 
  render() {
    return (
      <div className="header mx-5 mt-5">
        <h1>Tic-tac-toe</h1>
       
        {  this.state.player === null && (<>
          <h3>Select player</h3>
        <button className = "select-player btn-primary" onClick ={this.handleSelectPalayerX}> X </button>
        <button className = "select-player btn-primary" onClick ={this.handleSelectPalayerO}> 0 </button></>)}
        
        {this.state.player && (<>
        <h3>Scoreboard</h3>
        <h4 >Player X <span className="score">{this.props.scoreX}</span>  :  <span className="score">{this.props.scoreO}</span> Player 0</h4>
        <p> You selected {this.state.player}</p>
        </>)}
        {this.state.player!==null && <Board selectedPlayer = {this.state.player}/>}
      </div>
    )
  }
}
const mapStateToProps = ({scoreX,scoreO} ) => {
  return {
    scoreX,
    scoreO
  };
};


export default connect(mapStateToProps)(App);
