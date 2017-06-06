
export function zipMap(lst1, lst2, fn) {
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
      output.push(fn(payload, x));
    } else {
      payload[bi] = bigger[x];
      payload[si] = smaller[x];
      output.push(fn(payload, x));
    }
  }
  return output;
}
