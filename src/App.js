import React, { Component } from 'react';
import Header from "./components/header"
import Container from "./components/container"
class App extends Component {
  render() {
    return (
      <div className="App">
      <Header />
      <Container />
      </div>
    );
  }
}

export default App;
