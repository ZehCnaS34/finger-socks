import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
// import { zipMap } from './util';

import {WordMatcher} from './WordMatcher';

class App extends Component {
  state = {
    wordFeed: [],
    completedWords: [],

    target: '',
    value: ''
  }

  /**
     * ApplyPatch takes a diff and applies it to the value
     * This is used to only register errors when wrong additions
     * are experienced.
     */
  applyPatch = ({isAdd, range, value}) => {}

  static createPatch(oldValue, newValue) {
    let patch = {
      range: [
        -1, -1
      ],
      value: ''
    }
    zipMap(oldValue.split(''), newValue.split(''), ([
      o, n
    ], i) => {
      if (n === undefined) {
        patch.isAdd = false
        patch.range[1] = i
      }
      if (o !== n) {
        if (patch.range[0] === -1) {
          patch.range[0] = i
        }

        patch.value = patch.value + n
      }

    })
    return patch
  }

  componentDidMount() {
    const wordFeed = "This is a test".split(' ');
    const target = wordFeed.shift();

    this.setState({wordFeed: wordFeed, target: target});
  }

  checkForWordMatch = (e) => {
    if (this.state.value === this.state.target) {
      const completed = this.state.completedWords;
      const wordFeed = this.state.wordFeed;
      completed.push(this.state.target);
      const target = wordFeed.shift();
      e.preventDefault();
      this.setState({wordFeed: wordFeed, completedWords: completed, target: target, value: ''});
    }
  }

  handleChar = (e) => {
    this.setState({
      value: this.state.value + String.fromCharCode(e.charCode)
    });
  }

  handleKey = (e) => {
    if (e.keyCode === 8) {
      this.setState({
        value: this.state.value.substr(0, this.state.value.length - 1)
      });
    }

    // If the key pressed was the space key, we need to check if the word matches
    if (e.keyCode === 32) {
      this.checkForWordMatch(e);
      console.log(e.keyCode, this.state.value);
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          {(this.state.target)
            ? (
              <div>
                {this.state.completedWords.map((word, idx) => (
                  <span key={idx style={{
                    color: 'green',
                    marginLeft: '5px',
                    marginRight: '5px'
                  }}>{word}</span>
                ))}
                <WordMatcher target={this.state.target} current={this.state.value}/> {this.state.wordFeed.map((word, idx) => (
                  <span key={idx style={{
                    marginLeft: '5px',
                    marginRight: '5px'
                  }}>{word}</span>
                ))}
              </div>
            )
            : (
              <h1>wait</h1>
            )}
        </div>
        <input autoFocus value={this.state.value} onKeyDown={this.handleKey} onKeyPress={this.handleChar}/>
      </div>
    );
  }
}

export default App;
