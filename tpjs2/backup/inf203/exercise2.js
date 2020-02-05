"use strict";

function refreshChat() {
    console.log("refreshChat");

    let text_client = new XMLHttpRequest();
    
    text_client.onreadystatechange = () => {
        if(text_client.readyState == 4 && text_client.status == 200){
           
            let lines = text_client.responseText.split('\n');
            
            // console.log(lines);
            
            let last10lines = lines.slice(lines.length-11,lines.length-1);
            
            // console.log(last10lines);
            // let d = new Date();
            // let all_p = "<p>"+ d.toLocaleTimeString()+"</p>\n";
            
            let all_p = "";
            for(let i =last10lines.length-1;i>=0;i--){
                // console.log('i = '+i);
                
                let p = "<p>"+last10lines[i]+"</p>\n";
                all_p += p;
            }
            document.getElementById("textarea").innerHTML = all_p;
        }
    };
    text_client.open("GET","chatlog.txt",false);
    text_client.send();

    // setTimeout(refreshChat,1000);
}

setInterval(refreshChat,1000);



function sendMessage(){
    
    console.log("sendMessage");

    let text_client = new XMLHttpRequest();
    
    // text_client.onreadystatechange = () => {
    //     if(text_client.readyState == 4 && text_client.status == 200){
            
    //     }
    // };

    text_client.open("GET","chat.php?phrase="+document.getElementById("textedit").value,false);
    text_client.send();
        
    document.getElementById("textedit").value='';
}

// window.onload = refreshChat;