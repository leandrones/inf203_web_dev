"use strict";
function loadDoc(){
    console.log("loadDoc");
    console.log(this);
    let text_client = new XMLHttpRequest();
    
    text_client.onreadystatechange = () => {
        if(text_client.readyState == 4 && text_client.status == 200){
            document.getElementById("textarea").innerHTML = 
            text_client.responseText;
        }
    };
    text_client.open("GET","text.txt",true);
    text_client.send();
}

function loadDoc2(){
    console.log("loadDoc2");

    console.log("loadDoc2\n"+this);

    let text_client = new XMLHttpRequest();
    
    text_client.onreadystatechange = () => {
        if(text_client.readyState == 4 && text_client.status == 200){
            let colors = ["red","green","blue"];
            
            // document.getElementById("textarea2");
            // console.log(text_client.responseText);
            let lines = text_client.responseText.split('\n');
            // console.log(lines);
            
            let all_p = "";
            for (let i in lines) {
                let p = "\n<p style=\"color:"+colors[i%3]+";\">"+lines[i]+"</p>\n";
                
                // document.createElement("p");

                all_p += p;
            }
            document.getElementById("textarea2").innerHTML = all_p;
        }
    };
    text_client.open("GET","text.txt",true);
    text_client.send();
}