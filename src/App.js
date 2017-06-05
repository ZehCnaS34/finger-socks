import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

const SentenceLineDisplay = ({targetText, inputText}) => {
  let spans = inputText.split('').map((char, idx) => {
    if (char === targetText[idx]) {
      return <span key={idx} style={{color: 'green'}}>{char}</span>
    } else {
      if (char === ' ') {
        return (targetText[idx]) ? (
          <span key={idx} style={{textDecoration: 'underline', color: 'red'}}>{targetText[idx]}</span>
        ) : (
          <span key={idx} style={{backgroundColor: 'red'}}>{' '}</span>
        )
      } else if (targetText[idx] === ' ') {
        return (
          <span key={idx} style={{backgroundColor: 'red'}}>{' '}</span>
        )
      } else {
        return (targetText[idx]) ? (
          <span key={idx} style={{color: 'red'}}>{targetText[idx]}</span>
        ) : (
          <span key={idx} style={{backgroundColor: 'red'}}>{' '}</span>
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


const PressEnter = ({a, b}) => (a.length === b.length) ? (
  <p>Press Enter</p>
) : (a.length >= b.length) ? (
  <p>you went overboard</p>
) : (
  <p>keep on going!</p>
);


class App extends Component {
  state = {
    inputText: "",
    lineFeed: [
      "I forgot this middle line",
      "Roses are red.",
      "Violets are blue.",
      "This is another sentence"
    ],
    completedLines: [
    ]
  }

  /** 
   * This function move
   */
  newLine = (e) => {
    let keyCode = e.keyCode || e.which
    if (keyCode === 13) {
      if (this.state.inputText === this.state.lineFeed[0]) {
        this.state.completedLines.push(this.state.lineFeed.shift())
        this.setState({lineFeed: this.state.lineFeed, inputText: ""})
      }
    }
  }

  render() {
    return (
      <div className="App">
        { this.state.lineFeed.length > 0 ? (
          <div>
            <SentenceLineDisplay
              inputText={this.state.inputText}
              targetText={this.state.lineFeed[0]} />
            <PressEnter a={this.state.inputText} b={this.state.lineFeed[0]} />
            <input 
              autoFocus={true}
              type="text"
              value={this.state.inputText} 
              onKeyPress={this.newLine}
              onChange={(e) => {
                return this.setState({inputText: e.target.value})}
              } />
          </div>
        ) : (
          <h1>DONE</h1>
        )
        }
      </div>
    );
  }
}

export default App;
