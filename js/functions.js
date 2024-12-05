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


//Функция по переводу часв в минуты
function makeHoursToMinutes (stringWithHours) {
  stringWithHours = stringWithHours.split(':');
  return stringWithHours[0] * 60 + Number(stringWithHours[1]);
}

//Функция по возврату true или false
function isCorrectTimeForMeeting (startWorkTime, endWorkTime, startMeetingTime, meetingLength) {
  const startWorkTimeInMinutes = makeHoursToMinutes(startWorkTime);
  const endWorkTimeInMinutes = makeHoursToMinutes(endWorkTime);
  const startMeetingTimeInMinutes = makeHoursToMinutes(startMeetingTime);


  if(startWorkTimeInMinutes < startMeetingTimeInMinutes && (startMeetingTimeInMinutes + meetingLength) < endWorkTimeInMinutes) {
    return true;
  }
  return false;
}

isCorrectTimeForMeeting();

