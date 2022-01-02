function PQc() {
    $('#output').empty();
    var x3, y3, result;
    var x1 = $('#PIdAddInputPx').val();
    var y1 = $('#PIdAddInputPy').val();
    var x2 = $('#PIdAddInputQx').val();
    var y2 = $('#PIdAddInputQy').val();
    var a = $('#PIdAddInputa').val();
    var b = $('#PIdAddInputb').val();
    var p = $('#PIdAddInputp').val();
    if (!isNum([x1, x2, y1, y2, a, b, p])) {
        result = "输入无效";
        $('#output').append(result);
        return;
    }
}