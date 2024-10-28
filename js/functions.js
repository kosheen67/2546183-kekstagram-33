function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}
checkStringLength('hello', 20);


function checkPalindrom(string) {
  const normalizedString = string.replaceAll(' ','').toLowerCase();
  let stringForCheck = '';
  for(let i = normalizedString.length - 1; i >= 0; i--) {
    stringForCheck += normalizedString[i];
  }
  return stringForCheck === normalizedString;
}
checkPalindrom('Dog and Cat');
