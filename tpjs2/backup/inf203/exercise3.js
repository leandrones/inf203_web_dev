"use strict";
function renderJSON(){
    return new Promise((resolve,reject) => {
        let text_client = new XMLHttpRequest();
        let json_obj = {};

        console.log('renderJSON');

        text_client.open("GET","slides.json",true);

        text_client.onload = () => {
            if(text_client.status < 300 && text_client.status >= 200){
                json_obj = JSON.parse(text_client.responseText);
                resolve(json_obj);
           }
           else{
               reject('Fail renderJSON');
           }
        };
        text_client.send();
    });   

    

    // let promise = new Promise( () => { 
    // });
    // promise.then((json_obj) =>{
    // })
}

function loadSlides(index_slide){
    console.log("loadSlides");

    renderJSON().
    then(json_obj =>{
        if(index_slide < json_obj.slides.length-1){
            
            let iframe = "<iframe src="+
            json_obj.slides[index_slide].url+" height=\"500\" width=\"900\"></iframe>\n";
    
            document.getElementById("MAIN").innerHTML = iframe;
            if(index_slide == 0)
                setTimeout(loadSlides.bind(null,index_slide+1),1000*json_obj.slides[index_slide+1].time);
            else{
                setTimeout(loadSlides.bind(null,index_slide+1),1000*(json_obj.slides[index_slide].time - 
                            json_obj.slides[index_slide-1].time));
            }
        }
        else if(index_slide == json_obj.slides.length-1){
            console.log("HEUUUUUY");
            let iframe = "<iframe src=\"\" height=\"500\" width=\"900\"></iframe>\n";
            document.getElementById("MAIN").innerHTML = iframe;
        }
    })
    .catch(error =>{
        console.log('Error: '+error);
    });
}
