import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';


function zipMap(lst1, lst2, fn) {
  let output = [];
  let [bigger, smaller] = lst1.length >= lst2.length ? 
    [lst1, lst2]: 
    [lst2, lst1];
  let [bi, si] = lst1.length >= lst2.length ? 
    [0, 1]: 
    [1, 0];

  for (let x = 0; x < bigger.length; x++) {
    let payload = [undefined, undefined];
    if (x >= smaller.length) {
      payload[bi] = bigger[x];
      payload[si] = null;
      output.push(fn(payload));
    } else {
      payload[bi] = bigger[x];
      payload[si] = smaller[x];
      output.push(fn(payload));
    }
  }
  return output;
}

window.zipMap = zipMap;


const SentenceLineDisplay = ({targetText, inputText, onError}) => {
  let spans = inputText.split('').map((char, idx) => {
    if (char === targetText[idx]) {
      return <span key={idx} style={{color: 'green'}}>{char}</span>
    }

    // NOTE: causes infinite render loop
     onError && setTimeout(() => onError(char), 0);

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
  });

  if (inputText.length < targetText.length) {
    let current = targetText.substr(inputText.length, targetText.length)[0];
    return (
      <h3><pre>{spans}<span style={{textDecoration: 'underline'}}>{current}</span>{targetText.substr(inputText.length+1, targetText.length)}</pre></h3>
    )
  } else {
    return <h3><pre>{spans}</pre></h3>
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
    lineFeed: "Search for Simple poems, articles about Simple poems, poetry blogs, or anything else Simple poem related using the PoetrySoup search engine at the top of the page.".split(",").map(s => s.trim()),
    completedLines: [
    ],
    times: [],
    errors: {}
  }

  percentComplete = () => {
    return (this.state.completedLines.length/(this.state.lineFeed.length+this.state.completedLines.length))*100
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

  registerError = (char) => {
    // console.log(char)
    if (this.state.errors[this.state.completedLines.length]) {
    } else {
      this.state.errors[this.state.completedLines] = 0
    }
    this.state.errors[this.state.completedLines.length]++
    this.setState({
      errors: this.state.errors
    })
  }

  restartRacer = () => {
    this.setState({
      lineFeed: this.state.completedLines,
      completedLines: []
    })
  }

  render() {
    return (
      <div className="App">
        { this.state.lineFeed.length > 0 ? (
          <div>
            <SentenceLineDisplay
              onError={this.registerError}
              inputText={this.state.inputText}
              targetText={this.state.lineFeed[0]} />
            <PressEnter a={this.state.inputText} b={this.state.lineFeed[0]} />
            <h3>Errors: {this.state.errors[this.state.completedLines.length] || 0}</h3>
            <h3>Percent Done: {this.percentComplete()}%</h3>
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
          <div>
            <h1>DONE</h1>
            <h3>Percent Done: {this.percentComplete()}%</h3>
            <button onClick={this.restartRacer}>Restart</button>
          </div>
        )
        }
      </div>
    );
  }
}

export default App;
