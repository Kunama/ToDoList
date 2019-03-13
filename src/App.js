import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
      <p>Task: </p>
      <input type='text' name='task'></input>
      </div>
    );
  }
}

export default App;
