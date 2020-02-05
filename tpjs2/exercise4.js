function bodyOnload(){
    "use strict"

    var reader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');
    var div = document.getElementById("MAIN");
    var jsonObj;
    var timeNow = -1;
    let timer_on = true;
    div.innerHTML = "";
    var iframe = document.createElement("iframe");
    iframe.height = "1000";
    iframe.width = "1500";
    div.appendChild(iframe);

    function showURL(){
        if(timer_on){
            timeNow += 1;
        }
        reader.open("get", "slides.json", true);
        reader.onreadystatechange = function(){
            if(reader.readyState==4 && reader.status==200){
                jsonObj = JSON.parse(reader.responseText);
                jsonObj.slides.map(function(o){
                    console.log(timeNow);
                    if(o.time === (timeNow%90)){
                        //console.log(timeNow);
                        iframe.setAttribute("src", o.url);
                    }
                });
            }
        }
        reader.send(null);
        window.setTimeout(showURL, 1000);
    }

    function pause(){
        timer_on = !timer_on;
    }

    function previous(){
        timer_on = false;
        let num = Math.floor(timeNow/5);
        let tempo = jsonObj.slides[num - 1];
        iframe.setAttribute("src", tempo.url);
        div.appendChild(iframe);
        timeNow -= 5;
    }

    function next(){
        timer_on = false;
        let num = Math.floor(timeNow/5);
        let tempo = jsonObj.slides[num + 1];
        iframe.setAttribute("src", tempo.url);
        div.appendChild(iframe);
        timeNow += 5;
    }

    let bplay = document.getElementById("PLAY");
    bplay.addEventListener("click", showURL);

    let bpause = document.getElementById("PAUSE");
    bpause.addEventListener("click", pause);

    let bpre = document.getElementById("PREVIOUS");
    bpre.addEventListener("click", previous);

    let bnext = document.getElementById("NEXT");
    bnext.addEventListener("click", next);

}