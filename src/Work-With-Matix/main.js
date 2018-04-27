var ages = [10,20,11,13,19,18];
var getLessAge = function(age) {
  return age <= 18;
};

var getAllAge = function(item, index) {
  var text = '[index: ' + item + '] = ' + item;
  printResult(text); 
}

var printResult = function(element) {
  document.getElementById('result-all').innerText = element + ',';
};

var showResult = function() {
  ages.forEach(getAllAge);
  document.getElementById('result-less-18').innerText = ages.filter(getLessAge);
};