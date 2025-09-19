function checkStringLength(textToValidate, maxLength) {
  return textToValidate.length <= maxLength;
}
// console.log(checkStringLength('Hi', 0));

function isPalindrom (string) {
  const newArray = string.split('');
  const reversedArray = newArray.reverse();
  const resultString = reversedArray.join('');
  return string === resultString;
}
// console.log(isPalindrom('kek'));

