
export function getColourString (colourAsNumber) {
  let colourAsString = colourAsNumber.toString(16)
  while (colourAsString.length < 6) {
    colourAsString = '0' + colourAsString
  }
  /* console.log('number: ' + colourAsNumber)
  console.log('  Result: ' + colourAsString)
  console.log() */
  return '#' + colourAsString
}
