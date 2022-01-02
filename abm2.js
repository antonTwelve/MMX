var a, b, m;
//直接计算
function abm() {
    var i;
    var result = 1;
    for (i = 0; i < b; i++) {
        result = (result * a) % m;
    }
    return result;
}

function calculate() {
    onmessage = function (e) {
        a=e.data[0];
        b=e.data[1];
        m=e.data[2];
        var result = abm();
        postMessage(result);
    }
}

calculate();