function isEmpty(str) {
    if(str.length == 0) return true
    else    return false
}

function isWhiteSpace(str) {
    var ws = "\t\n\r";
    for (var i =0; i<str.length; i++) {
        var c = str.charAt(i);
        if(ws.indexOf(c) == -1)
            return true;
    }
    return false;
}

function validate(formularz) {
    if(isEmpty(formularz.elements["f_imie"].value) || isWhiteSpace(formularz.elements["f_imie"].value)) {
        alert("Podaj imię!")
        return false
    }
    return true
}