import React, { Component } from 'react'
import Board from './components/Board';
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
      <div className="header">
        <h1>Tic-tac-toe</h1>
        <h3>Select player</h3>
        <button className = "select-player" onClick ={this.handleSelectPalayerX}> X </button>
        <button className = "select-player" onClick ={this.handleSelectPalayerO}> 0 </button>
        {this.state.player && (<p> you selected {this.state.player}</p>)}
        <Board />
      </div>
    )
  }
}


export default App;
