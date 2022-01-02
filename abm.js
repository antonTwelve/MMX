var a, b, m;
//模重复平方法
function rep() {
    var result = 1;
    while (b >= 1) {
        if (b & 1 == 1) {
            result = (a * result) % m;
        }
        a = (a * a) % m;
        b >>= 1;
    }
    return result;
}

function calculate() {
    onmessage = function (e) {
        a = e.data[0];
        b = e.data[1];
        m = e.data[2];
        var result = rep();
        postMessage(result);
    }
}

calculate();