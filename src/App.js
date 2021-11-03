import './App.css';
import React from 'react';
import Header from './components/Header';
import Body from './components/Body';

class App extends React.Component {

  render() {
    return (
      <div className="app">
        <Header />
        <Body/>
      </div>
    );
  }
  
}

export default App;
