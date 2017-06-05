import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

const SentenceLineDisplay = ({targetText, inputText}) => {
  let spans = inputText.split('').map((char, idx) => {
    if (char === targetText[idx]) {
      return <span key={idx} style={{color: 'green'}}>{char}</span>
    } else {
      if (char === ' ') {
        console.log('in here');
        return (
          <span key={idx} style={{textDecoration: 'underline', color: 'red'}}>{targetText[idx]}</span>
        )
      } else {
        return (
          <span key={idx} style={{color: 'red'}}>{targetText[idx]}</span>
        )
      }
    }
  });

  if (inputText.length < targetText.length) {
    let current = targetText.substr(inputText.length, targetText.length)[0];
    return (
      <h1><pre>{spans}<span style={{textDecoration: 'underline'}}>{current}</span>{targetText.substr(inputText.length+1, targetText.length)}</pre></h1>
    )
  } else {
    return <h1><pre>{spans}</pre></h1>
  }
};


class App extends Component {
  state = {
    text: "This is a sample thingBruh This is pretty interesting",
    input: ""
  }


  render() {
    return (
      <div className="App">
        <SentenceLineDisplay
          inputText={this.state.input}
          targetText={this.state.text} />
        <input 
          autofocus={true}
          type="text"
          value={this.state.input} 
          onChange={(e) => this.setState({input: e.target.value})} />
      </div>
    );
  }
}

export default App;
