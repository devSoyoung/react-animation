import React from 'react';
import { Input, Submit, Motion, Animated, Velocity } from './components';
import './App.css';

const App = () => (
  <div className="App">
    <h1>React Animation</h1>
    <div>
      <h2>CSS Animation</h2>
      <p>If the input form is focused, the width of the box increases.</p>
      <Input />
    </div>
    <div>
      <h2>Javascript Style Animation</h2>
      <p>Input length is more than 4, Submit button enable.</p>
      <Submit />
    </div>
    <div>
      <h2>react-motion Library</h2>
      <Motion />
    </div>
    <div>
      <h2>Animated Library</h2>
      <Animated />
    </div>
    <div>
      <h2>Velocity Animate Library</h2>
      <Velocity />
    </div>
  </div>
);

export default App;
