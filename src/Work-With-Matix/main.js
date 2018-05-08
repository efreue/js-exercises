var ages = [10,20,11,13,19,18,41, 15];
var getLessAge = function(age) {
  return age <= 15;
};

var getAllAge = function(item, index) {
  printResult('[index: ' + index + ' - VALUE: ' + item + '] '); 
}

var printResult = function(element) {
  document.getElementById('result-all').innerText += element + ',';
};

var showResult = function() {
  ages.forEach(getAllAge);
  document.getElementById('result-less-15').innerText = ages.filter(getLessAge);
};