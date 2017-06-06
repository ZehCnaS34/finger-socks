import React from 'react';
import { zipMap } from './util'

console.log(zipMap);

export const WordMatcher = ({current, target}) => {
  if (current.length > target.length) {
    return (
      <span style={{backgroundColor: 'red'}}>
        {current}
      </span>
    );
  }
  let o = zipMap(current.split(''), target.split(''), ([c, t], idx) => {
    if (c === t) {
      return <span key={idx} style={{backgroundColor: 'green', textDecoration: 'underline'}}>{t}</span>
    }

    if (t === undefined) {
      return <span key={idx} style={{backgroundColor: 'red'}}>{' '}</span>
    }

    if (idx < current.length) {
      return <span key={idx} style={{backgroundColor: 'red'}}>{t}</span>
    }

    return  <span key={idx} style={{backgroundColor: 'grey', textDecoration: 'underline'}}>{t}</span>
  })
  if (o.length > 0) {
    return <span style={{marginRight: '5px', marginLeft: '5px'}}>{o}</span>;
  }
  return null
}
