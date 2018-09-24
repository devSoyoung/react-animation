import React, { Component } from 'react';
import './App.css';

import Input from './input';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>React Animation</h1>
        <div>
          <h2>CSS Animation</h2>
          <p>If the input form is focused, the width of the box increases.</p>
          <Input />
        </div>
      </div>
    );
  }
}

export default App;
