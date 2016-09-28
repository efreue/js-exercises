var getData = function(callback) {
    var ajax;
    ajax.url = 'http://...';
    ajax.onload = fu() {
        callback(ajax.responseText);
    };
};

var callAfterOneMinute = function(callback) {
    setTimeout(function() {
        callback();
    }, 60000);
};



document.onclick = function() {

    callAfterOneMinute(function(){
        getData(function(data) {
            alert(data);
        });
    });
    alert('click');
};
