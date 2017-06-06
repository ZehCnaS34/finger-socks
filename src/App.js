import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { zipMap } from './util';

import { WordMatcher } from './WordMatcher';

class App extends Component {
  state = {
    wordFeed: [],
    completedWords: [],

    target: '',
    value: ''
  }

  componentDidMount() {
    let wordFeed = "This is a test".split(' '),
      target = wordFeed.shift()

    this.setState({
      wordFeed,
      target
    })
  }

  checkForWordMatch = (e) => {
    if (this.state.value === this.state.target) {
      let completed = this.state.completedWords;
      let wordFeed = this.state.wordFeed;
      completed.push(this.state.target);
      let target = wordFeed.shift();
      e.preventDefault()
      this.setState({
        wordFeed,
        completedWords: completed,
        target,
        value: ''
      })

    }
  }

  handleChar = (e) => {
    this.setState({
      value: this.state.value + String.fromCharCode(e.charCode)
    })
  }

  handleKey = (e) => {
    if (e.keyCode === 8) {
      this.setState({
        value: this.state.value.substr(
          0,
          this.state.value.length -1
        )
      })
    }
    if (e.keyCode === 32) {
      this.checkForWordMatch(e);
      console.log(e.keyCode, this.state.value)
    }
  }

  render() {
    return (
      <div className="App">
        <p>
          {
            (this.state.target) ? (
              <div>
              {this.state.completedWords.map((word, idx) => (
                <span style={{color: 'green', marginLeft: '5px', marginRight: '5px'}}key={idx}>{word}</span>

              ))}
              <WordMatcher target={this.state.target} current={this.state.value} />
              {this.state.wordFeed.map((word, idx) => (
                <span style={{marginLeft: '5px', marginRight: '5px'}}key={idx}>{word}</span>
              ))}
            </div>
            ) : (
              <h1>wait</h1>
            )
          }
        </p>
        <input
          autoFocus
          value={this.state.value}
          onKeyDown={this.handleKey}
          onKeyPress={this.handleChar} />
      </div>
    );
  }
}

export default App;
