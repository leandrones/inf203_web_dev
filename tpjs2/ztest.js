let note = 0;
let root = "file:///C:/Users/Hsin Chang/Desktop/TP3";
let student = "xizhang";
const urlSlide1 = "https://perso.telecom-paristech.fr/dufourd/cours/inf203/";
const urlSlide2 = "https://www.telecom-paristech.fr/";
const urlSlide3 = "https://perso.telecom-paristech.fr/dufourd/cours/inf203/js.html#/equality";

function hashcode(s){
    let hash = 0;
    if (s.length === 0) return hash;
    for (let i = 0; i < s.length; i++) {
        const char = s.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

function next() {
    console.log("dsgffh");
    try {
        document.getElementById('f').src = root+"/ex1.html";
    } catch(e) {
        console.log("error in next: "+e);
    }
}

function next1() {
    try {
        const iframe = document.getElementById('f').contentDocument;
        if (!iframe) console.log("iframe.contentDocument is null in next1 ??");
        iframe.getElementById("button1").click();
        iframe.getElementById("button2").click();
    } catch(e) {
        console.log("error in next1: "+e);
    }
}

function next2() {
    try {
        const iframe = document.getElementById('f').contentDocument;
        if (!iframe) console.log("iframe.contentDocument is null in next2 ??");
        try {
            const text1 = iframe.getElementById("textarea").textContent;
            if (text1.indexOf('Lorem ipsum') === 0 && text1.indexOf('interdum mi.') > 2000) {
                note += 1;
                document.getElementById("note").textContent = "" + note;
                console.log("ok1a")
            } else {
                console.log(text1.indexOf('Lorem ipsum') + " -- " + text1.indexOf('interdum mi.'))
            }
        } catch (err) {
            console.log("error ex1a");
            console.log(err)
        }
        try {
            const text2 = iframe.getElementById("textarea2").children;
            if (text2.length === 5 &&
                text2[0].tagName === "P" &&
                text2[1].tagName === "P" &&
                text2[0].style.color !== text2[1].style.color &&
                text2[1].style.color !== text2[2].style.color &&
                text2[2].style.color !== text2[3].style.color &&
                text2[3].style.color !== text2[4].style.color) {
                note += 1;
                document.getElementById("note").textContent = "" + note;
                console.log("ok1b")
            }
        } catch (err) {
            console.log("error ex1b");
            console.log(err)
        }
        document.getElementById('f').src = root + "/ex2.html";
    } catch (e) {
        console.log("error in next2: " + e);
    }
    setTimeout(next3, 1000)
}

function next3() {
    try {
        const iframe = document.getElementById('f').contentDocument;
        if (!iframe) console.log("iframe.contentDocument is null in next3 ??");
        if (!iframe.getElementById("textedit") || !iframe.getElementById("sendbutton")) {
            console.log("missing or wrong id for buttons")
        }
        var wait = 0;
        setTimeout(function () {
            iframe.getElementById("textedit").value = "testing1";
            iframe.getElementById("sendbutton").click()
        }, wait += 500);
        setTimeout(function () {
            iframe.getElementById("textedit").value = "testing2";
            iframe.getElementById("sendbutton").click()
        }, wait += 500);
        setTimeout(function () {
            iframe.getElementById("textedit").value = "testing3";
            iframe.getElementById("sendbutton").click()
        }, wait += 500);
        setTimeout(function () {
            iframe.getElementById("textedit").value = "testing4";
            iframe.getElementById("sendbutton").click()
        }, wait += 500);
        setTimeout(function () {
            iframe.getElementById("textedit").value = "testing5";
            iframe.getElementById("sendbutton").click()
        }, wait += 500);
        setTimeout(function () {
            iframe.getElementById("textedit").value = "testing6";
            iframe.getElementById("sendbutton").click()
        }, wait += 500);
        setTimeout(function () {
            iframe.getElementById("textedit").value = "testing7";
            iframe.getElementById("sendbutton").click()
        }, wait += 500);
        setTimeout(function () {
            iframe.getElementById("textedit").value = "testing8";
            iframe.getElementById("sendbutton").click()
        }, wait += 500);
        setTimeout(function () {
            iframe.getElementById("textedit").value = "testing9";
            iframe.getElementById("sendbutton").click()
        }, wait += 500);
        setTimeout(function () {
            iframe.getElementById("textedit").value = "testing_testing";
            iframe.getElementById("sendbutton").click()
        }, wait += 500);
    } catch(e) {
        console.log("error in next3: "+e);
    }
    setTimeout(next4, wait + 1000)
}

function next4() {
    try {
        const iframe = document.getElementById('f').contentDocument;
        if (!iframe) console.log("iframe.contentDocument is null in next4 ??");
        const content = iframe.getElementById("textarea").children;
        console.log(content);
        if (content[0].textContent.indexOf('testing_testing') === content[0].textContent.length - 15) {
            note += 1;
            console.log("ok2a")
        } else {
            console.log("error on last message |"+content[0].textContent+"| "+
                content[0].textContent.indexOf('testing_testing')+" "+
                content[0].textContent.length - 15);
        }
        if (content.length === 10) {
            note += 1;
            console.log("ok2b")
        } else {
            console.log("error on the number of displayed messages: "+content.length)
        }
        if (content[1].textContent.indexOf('testing9') === content[1].textContent.length - 8 &&
            content[9].textContent.indexOf('testing1') === content[9].textContent.length - 8) {
            note += 1;
            console.log("ok2c");
        } else {
            console.log("error on other messages");
            console.log(content);
        }
    } catch (err) {
        console.log("error ex2");
        console.log(err)
    }
    document.getElementById("note").textContent = "" + note;
    document.getElementById('f').src = root+"/ex3.html";
    setTimeout(next5, 1000)
}

function next5() {
    try {
        const iframe = document.getElementById('f').contentDocument;
        if (!iframe) console.log("iframe.contentDocument is null in next5 ??");
        if (!iframe.getElementById("PLAY") || !iframe.getElementById("MAIN")) {
            console.log("missing or wrong id for button or slide div")
        } else {
            iframe.getElementById("PLAY").click();
        }
    } catch(e) {
        console.log("error in next5: "+e);
    }
    setTimeout(next6, 2500)
}

function next6() {
    try {
        const iframe = document.getElementById('f').contentDocument;
        if (!iframe) console.log("iframe.contentDocument is null in next6 ??");
        if (iframe.getElementById("MAIN").firstElementChild &&
            iframe.getElementById("MAIN").firstElementChild.src === urlSlide1) {
            note += 1;
            console.log("ok3a");
            document.getElementById("note").textContent = "" + note
        } else {
            console.log("bad url at the beginning " + (iframe.getElementById("MAIN").firstElementChild &&
                iframe.getElementById("MAIN").firstElementChild.src))
        }
    } catch(e) {
        console.log("error in next6: "+e);
    }
    setTimeout(next7, 5000)
}

function next7() {
    try {
        const iframe = document.getElementById('f').contentDocument;
        if (!iframe) console.log("iframe.contentDocument is null in next7 ??");
        if (iframe.getElementById("MAIN").firstElementChild &&
            iframe.getElementById("MAIN").firstElementChild.src === urlSlide2) {
            note += 1;
            console.log("ok3b");
            document.getElementById("note").textContent = "" + note;
        } else {
            console.log("bad url after 5s " +
                (iframe.getElementById("MAIN").firstElementChild &&
                    iframe.getElementById("MAIN").firstElementChild.src))
        }
    } catch(e) {
        console.log("error in next7: "+e);
    }
    setTimeout(next8, 30000);
}

function next8() {
    try {
        const iframe = document.getElementById('f').contentDocument;
        if (!iframe) console.log("iframe.contentDocument is null in next8 ??");
        if (iframe.getElementById("MAIN").firstElementChild === null ||
            iframe.getElementById("MAIN").firstElementChild.src === "" ||
            iframe.getElementById("MAIN").firstElementChild.src === document.getElementById('f').src) {
            note += 1;
            console.log("ok3c");
            document.getElementById("note").textContent = "" + note
        } else {
            console.log("bad url at the end of the presentation")
        }
        document.getElementById('f').src = root+"/ex4.html";
    } catch(e) {
        console.log("error in next8: "+e);
    }
    setTimeout(next81, 1000)
}

function next81() {
    try {
        const iframe = document.getElementById('f').contentDocument;
        if (!iframe) console.log("iframe.contentDocument is null in next81 ??");
        if (!iframe.getElementById("PLAY")) {
            console.log("no play button")
        } else {
            iframe.getElementById("PLAY").click()
        }
        setTimeout(function () {
            document.getElementById('f').contentDocument.getElementById("PAUSE").click()
        }, 7500);
    } catch(e) {
        console.log("error in next81: "+e);
    }
    setTimeout(next9, 15000)
}

function next9() {
    try {
        const iframe = document.getElementById('f').contentDocument;
        if (!iframe) console.log("iframe.contentDocument is null in next9 ??");
        const mainFirstChild = iframe.getElementById("MAIN").firstElementChild;
        if (mainFirstChild && mainFirstChild.src === urlSlide2) {
            note += 1;
            console.log("ok4a");
            document.getElementById("note").textContent = "" + note;
        } else {
            console.log("pause does not work")
        }
        iframe.getElementById("NEXT").click();
        if (mainFirstChild && mainFirstChild.src === urlSlide3) {
            note += 1;
            console.log("ok4b");
            document.getElementById("note").textContent = "" + note;
        } else {
            console.log("next does not work")
        }
        iframe.getElementById("PREVIOUS").click();
        if (mainFirstChild && mainFirstChild.src === urlSlide2) {
            note += 1;
            console.log("ok4c");
        } else {
            console.log("previous does not work")
        }
    } catch(e) {
        console.log("error in next9: "+e);
    }
    document.getElementById("note").textContent = "(final) " + note * 20 / 11;
    const grade = Math.floor(note*200/11)/10;
    let queryPar = "grade="+grade+"&student="+student;
    queryPar = queryPar+"&hash=" + hashcode(queryPar);
    location.href = "/registerGrade?"+queryPar;
}

next2();