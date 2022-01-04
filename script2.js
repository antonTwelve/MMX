//计算a在模b下的逆元
function inverse(a, b) {
    var Tb = b; //暂存
    var s1 = 1, s2 = 0, s3;
    var c = 1;
    while (a < 0)
        a = (a + parseInt(b)) % b;
    while (c != 0) {
        c = a % b;
        q = parseInt(a / b);
        s3 = s1 - q * s2;
        s1 = s2;
        if (c != 0) {
            s2 = s3;
        }
        a = b;
        b = c;
    }
    while (parseInt(s2) < 0)
        s2 += parseInt(Tb);
    return s2;
}

function PaP_F(x1, y1, a, p) {
    var x3, y3, result = "<div class='resultStyle4'>";
    var s = ((3 * x1 * x1 + parseInt(a)) * inverse(2 * y1, p)) % p;
    while (s < 0)
        s = (s + parseInt(p)) % p;
    var tccc = (3 * x1 * x1 + parseInt(a)) + "*" + (2 * y1) + "' mod" + p;
    tccc += ("=" + (3 * x1 * x1 + parseInt(a)) + "*" + inverse(2 * y1, p) + "mod" + p);
    $('#output').append(result + "s = ((3*x1²+a)/(2*y1))mod p = " + tccc + " = " + s + "</div>");
    x3 = (s * s - x1 - x1) % p;
    while (x3 < 0)
        x3 = (x3 + parseInt(p)) % p;
    tccc = s + "² - " + x1 + " - " + x1 + " mod " + p + " = ";
    $('#output').append(result + "x3 = s²-x1-x2 mod p = " + tccc + x3 + "</div>");
    y3 = (s * (x1 - x3) - y1) % p;
    while (y3 < 0)
        y3 = (y3 + parseInt(p)) % p;
    tccc = s + "*(" + x1 + "-" + x3 + ")-" + y1 + " mod " + p + " = ";
    $('#output').append(result + "y3 = s(x1-x3)-y1 mod p = " + tccc + y3 + "</div>");
    result += "2P = ( " + x3 + "," + y3 + " )</div>";
    $('#output').append(result);
}

//计算椭圆曲线上不同两点相加的结果
function PQc() {
    $('#output').empty();
    var x3, y3, result = "<div class='resultStyle4'>";
    var x1 = $('#PIdAddInputPx').val();
    var y1 = $('#PIdAddInputPy').val();
    var x2 = $('#PIdAddInputQx').val();
    var y2 = $('#PIdAddInputQy').val();
    var a = $('#PIdAddInputa').val();
    var b = $('#PIdAddInputb').val();
    var p = $('#PIdAddInputp').val();
    if (!isNum([x1, x2, y1, y2, a, b, p])) {
        result += ("输入无效" + "</div>");
        $('#output').append(result);
        return;
    }
    else if (x1 == x2 && y1 == y2) {
        PaP_F(x1, y1, a, p);
        console.log("test!");
        return;
    }
    var s = ((y2 - y1) * inverse(x2 - x1, p)) % p;
    while (s < 0)
        s = (s + parseInt(p)) % p;
    var tccc = (y2 - y1) + "*" + (x2 - x1) + "' mod" + p;
    tccc += ("=" + (y2 - y1) + "*" + inverse(x2 - x1, p) + "mod" + p);
    $('#output').append(result + "s = ((y2-y1)/(x2-x1))mod p = " + tccc + " = " + s + "</div>");
    x3 = (s * s - x1 - x2) % p;
    while (x3 < 0)
        x3 = (x3 + parseInt(p)) % p;
    tccc = s + "² - " + x1 + " - " + x2 + " mod " + p + " = ";
    $('#output').append(result + "x3 = s²-x1-x2 mod p = " + tccc + x3 + "</div>");
    y3 = (s * (x1 - x3) - y1) % p;
    while (y3 < 0)
        y3 = (y3 + parseInt(p)) % p;
    tccc = s + "*(" + x1 + "-" + x3 + ")-" + y1 + " mod " + p + " = ";
    $('#output').append(result + "y3 = s(x1-x3)-y1 mod p = " + tccc + y3 + "</div>");
    result += "P + Q = ( " + x3 + "," + y3 + " )</div>";
    $('#output').append(result);
}

function PaP() {
    $('#output').empty();
    var x1 = $('#PIdDInputPx').val();
    var y1 = $('#PIdDInputPy').val();
    var a = $('#PPInputa').val();
    var b = $('#PPInputb').val();
    var p = $('#PPInputp').val();
    if (!isNum([x1, y1, a, b, p])) {
        var result = "<div class='resultStyle4'>输入无效</div>";
        $('#output').append(result);
        return;
    }
    PaP_F(x1, y1, a, p);
}