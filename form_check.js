function isEmpty(str) {
    if(str.length == 0) return true;
    else    return false;
}

function isWhiteSpace(str) {
    var ws = "\t\n\r ";
    for (var i =0; i<str.length; i++) {
        var c = str.charAt(i);
        if(ws.indexOf(c) != -1)
            return true;
    }
    return false;
}

function checkString(str, message) {
    if(isEmpty(str) || isWhiteSpace(str)) {
        alert(message);
        return false;
    }
    return true;
}

function checkEmail(str) {
    if(isWhiteSpace(str)){
        alert("Podaj właściwy e-mail");
        return false;
    }
    else{
        var at = str.indexOf("@");
        if(at < 1){
            alert("Niepoprawny adres e-mail");
            return false;
        }
        else {
            var l = -1;
            for (var i = 0; i < str.length; i++) {
                var c = str.charAt(i);
                if(c == "."){
                    l = i;
                }
            }
            if((l < (at + 2)) || (l == str.length - 1) ){
                alert("Niepoprawny e-mail");
                return false;
            }
        }
        return true;
    }
}

function checkEmailRegEx(str) {
    var email = /[a-zA-Z_0-9\.]+@[a-zA-Z_0-9\.]+\.[a-zA-Z][a-zA-Z]+/;
    if(email.test(str))
        return true;
    else{
        alert("Podaj właściwy e-mail");
        return false;
    }
}

function checkStringAndFocus(obj, msg) {
    var str = obj.value;
    var errorFieldName = "e_" + obj.name.substr(2, obj.name.length);
    if(isWhiteSpace(str) || isEmpty(str)){
        document.getElementById(errorFieldName).innerHTML = msg;
        obj.focus();
        startTimer(errorFieldName);
        return false;
    }
    else {
        return true;
    }
}

var errorField = "";

function startTimer(fName) {
    errorField = fName;
    window.setTimeout("clearError(errorField)", 5000);
}

function clearError(objName) {
    document.getElementById(objName).innerHTML = "";
}

function showElement(e) {
    document.getElementById(e).style.visibility = 'visible';
}

function hideElement(e) {
    document.getElementById(e).style.visibility = 'hidden';
}

function checkZIPCodeRegEx(str) {
    var zipCode = /^[0-9]{2}\-[0-9]{3}$/
    if(zipCode.test(str)){
        document.getElementById('kod').innerHTML = "OK";
        document.getElementById('kod').className = "green";
        return false;
    }
    else {
        document.getElementById('kod').innerHTML = "Źle";
        document.getElementById('kod').className = "red";
        return true;
    }
}

function validate(formularz) {
    var stringtable = ["f_imie", "f_nazwisko", "f_ulica", "f_miasto"];
    var ziptable = ["f_kod"];
    var emailtable = ["f_email"];
    var ifValid = true;
    for (var i = 0; i < stringtable.length; i++) {
        if(!checkStringAndFocus(formularz.elements[stringtable[i]], "Podaj")){
            formularz.elements[stringtable[i]].className = "wrong";
            ifValid = false;
        }
    }
    if(checkZIPCodeRegEx(formularz.elements[ziptable[0]].value)) {
        formularz.elements[ziptable[0]].className = "wrong";
        ifValid = false;
    }
    if(!checkEmailRegEx(formularz.elements[emailtable[0]].value)) {
        formularz.elements[emailtable[0]].className = "wrong"
        ifValid = false;
    }

    if(ifValid)
        return true;
    else
        return false;


}

function alterRows(i, e) {
    if(e){
        if(i % 2 == 1){
            e.setAttribute("style", "background-color: Aqua;");
        }
        e = e.nextSibling;
        while (e && e.nodeType != 1) {
            e = e.nextSibling;
        }
        alterRows(++i, e);
    }
}

alterRows(1, document.getElementsByTagName("tr")[0]);

function nextNode(e) {
    while (e && e.nodeType != 1){
        e = e.nextSibling;
    }
    return e;
}

function prevNode(e) {
    while (e && e.nodeType != 1) {
        e = e.previousSibling;
    }
    return e;
}

function swapRows(b) {
    var tab = prevNode(b.previousSibling);
    var tBody = nextNode(tab.firstChild);
    var lastNode = prevNode(tBody.lastChild);
    tBody.removeChild(lastNode);
    var firstNode = nextNode(tBody.firstChild);
    tBody.insertBefore(lastNode, firstNode);
}

function cnt(form, msg, maxSize) {
    if(form.value.length > maxSize)
        form.value = form.value.substring(0, maxSize);
    else
        msg.innerHTML = maxSize - form.value.length;
}