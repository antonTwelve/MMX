var webWorker1;
var webWorker2;

function setCookie(tarID) {
    var d = new Date();
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = "state=" + tarID + "; " + expires;
}

function getCookie() {
    var name = "state=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function isNum(n) { //判断数组n中所有元素是否都是数字
    var temp;
    for (var i = 0; i < n.length; i++) {
        temp = n[i]
        if (temp == '' || temp.match(/[^0-9]/g) != null)
            return false;
    }
    return true;
}

function sw(name) {     //切换功能
    setCookie(name);
    name = '#' + name;
    $('.Box').hide();
    $(name).show();
    $('#output').empty();
    $('input').val('');
}

function mod() {
    $('#output').empty();
    var a = $('#ysInputA').val();
    var b = $('#ysInputB').val();
    var result;
    if (!isNum([a, b]))
        result = "输入无效";
    else
        result = a % b;
    result = "<div class='fontStyle1' style='text-align:center; margin-top:100px;'>" + result + "</div>"
    $('#output').append(result);
}

//模重复平方法
function rep(a, b, m) {
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
//直接计算
function abm(a, b, m) {
    var i;
    var result = 1;
    for (i = 0; i < b; i++) {
        result = (result * a) % m;
    }
    return result;
}

function abmmod() {
    $('#output').empty();
    var a = $('#abmInputA').val();
    var b = $('#abmInputB').val();
    var m = $('#abmInputM').val();
    var result1;
    var result2;
    if (!isNum([a, b, m])) {
        result1 = "输入无效";
        result1 = "<div class='resultStyle2'>" + result1 + "</div>"
        $('#output').append(result1);
        return;
    }
    else {
        $('#abmA').text(a);
        $('#abmB').text(b);
        $('#abmM').text(m);
        if (typeof (Worker) !== "undefined") {
            if (typeof (webWorker1) != "undefined") {
                webWorker1.terminate();
                webWorker1 = undefined;
            }
            webWorker1 = new Worker("abm.js");
            webWorker1.postMessage([a, b, m]);
            webWorker1.onmessage = function (event) {
                result1 = event.data;
                result1 = "<div class='resultStyle2'>模重复平方法结果:" + result1 + "</div>"
                $('#output').prepend(result1);
            };
            if (typeof (webWorker2) != "undefined") {
                webWorker2.terminate();
                webWorker2 = undefined;
            }
            webWorker2 = new Worker("abm2.js");
            webWorker2.postMessage([a, b, m]);
            webWorker2.onmessage = function (event) {
                result2 = event.data;
                result2 = "<div class='resultStyle2'>直接计算结果:" + result2 + "</div>"
                $('#output').append(result2);
            };
        } else {
            result1 = rep(a, b, m);
            result1 = "<div class='resultStyle2'>模重复平方法结果:" + result1 + "</div>"
            $('#output').prepend(result1);
            result2 = abm(a, b, m);
            result2 = "<div class='resultStyle2'>直接计算结果:" + result2 + "</div>"
            $('#output').append(result2);
        }
    }
}

function Euclid() {
    var a = $('#EinputA').val();
    var b = $('#EinputB').val();
    var q, c = 1;
    var result;
    $('#output').empty();
    if (!isNum([a, b])) {
        result = "<div class='resultStyle3'>无效输入</div>";
        $('#output').append(result);
    }
    else {
        var Ta = a, Tb = b;
        var s1 = 1, s2 = 0, t1 = 0, t2 = 1;
        var s3, t3;
        if (parseInt(b) > parseInt(a)) {
            var t = a;
            a = b;
            b = t;
            s1 = 0, s2 = 1, t1 = 1, t2 = 0;
        }
        while (c != 0) {
            c = a % b;
            q = parseInt(a / b);
            s3 = s1 - q * s2;
            t3 = t1 - q * t2;
            s1 = s2;
            t1 = t2;
            if (c != 0) {
                s2 = s3;
                t2 = t3;
            }
            result = "<div class='resultStyle3'>" + a + " = " + q + " x " + b;
            if (c != 0)
                result += (" + " + c)
            result += "</div>";
            $('#output').append(result);
            a = b;
            b = c;
        }
        result = "<div class='resultStyle3'>最大公因数为: " + a + "</div>";
        $('#output').append(result);
        result = "<div class='resultStyle3'>" + s2 + " x " + Ta;
        if (parseInt(t2) >= 0) result += " + ";
        result += (t2 + " x " + Tb + " = 1" + "</div>");
        $('#output').append(result);
        var Ts2 = s2;
        while (parseInt(Ts2) < 0)
            Ts2 += parseInt(Tb);
        Ts2 = Ts2 % Tb;
        result = "<div class='resultStyle3'>" + Ta + "在模" + Tb + "下的逆元为: " + s2;
        if (Ts2 != s2) result += "   或:  " + Ts2;
        result += "</div>";
        $('#output').append(result);
        var Tt2 = t2;
        while (parseInt(Tt2) < 0)
            Tt2 += parseInt(Ta);
        Tt2 = Tt2 % Ta;
        result = "<div class='resultStyle3'>" + Tb + "在模" + Ta + "下的逆元为: " + t2;
        if (Tt2 != t2) result += "   或:  " + Tt2;
        result += "</div>";
        $('#output').append(result);
    }
}

window.onload = function () {
    var tid = getCookie();
    if (tid == '') {   //cookie为空
        tid = "余数";
    }
    tid = '#' + tid;
    $('.Box').hide();
    $(tid).show();
}