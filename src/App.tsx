import React, { FunctionComponent } from 'react';
import { Home } from './components/Home/Home';
import './App.scss';

const App: FunctionComponent = () => {
  return (
    <div className="app">
      <Home />
    </div>
  );
};

export default App;
