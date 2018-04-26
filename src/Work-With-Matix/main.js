var ages = [10,20,11,13,19,18];
var getLessAge = function(age) {
  return age <= 18;
};

var showLessAge = function() {
  document.getElementById('result1').innerText = ages.filter(getLessAge);
};