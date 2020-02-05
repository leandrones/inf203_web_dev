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

var timer_id;
var current_slide;
var json_obj_slides_length;
var pause_bool = true;
var json_global;
var iframe;

window.onload = () =>{
    let div = document.getElementById("MAIN");

    iframe = document.createElement("iframe");
    iframe.height = 500;
    iframe.width = 900;
    div.appendChild(iframe);
}

function loadSlides(index_slide,keep_playing){
    current_slide = index_slide;
    
    console.log("loadSlides");
    console.log(json_global.slides[index_slide].url);   
    // console.log('play cs = '+current_slide);

    // console.log(json_global);
    
    // console.log('load jso len = '+json_obj_slides_length);
    
    if(index_slide < json_global.slides.length-1){
        iframe.src = json_global.slides[index_slide].url;

        // let iframe = "<iframe src="+
        // json_global.slides[index_slide].url+" height=\"500\" width=\"900\"></iframe>\n";

        // document.getElementById("MAIN").innerHTML = iframe;
        if(keep_playing){
            if(index_slide == 0)
                timer_id = setTimeout(loadSlides.bind(null,index_slide+1),1000*json_global.slides[index_slide+1].time);
            else{
                timer_id = setTimeout(loadSlides.bind(null,index_slide+1),1000*json_global.slides[index_slide].time - 
                            json_global.slides[index_slide-1].time);
            }
        }
    }
   
}

function play(){
    
    console.log("play");    
    // console.log('play cs = '+current_slide);

    renderJSON().
    then(json_obj =>{
        json_global = json_obj;
        // console.log('js glo');
        // console.log(json_global);
        // console.log('js ');
        // console.log(json_obj);
        loadSlides(0,true);
    })
    .catch(error =>{
        console.log('Error: '+error);
    });

}

function pause(){
    if(pause_bool){
        clearTimeout(timer_id);
    }
    else{
        setTimeout(loadSlides.bind(null,current_slide+1,true),1000);
    }
    pause_bool = !pause_bool;

    console.log('pla bool = '+pause_bool);
}

function next(){
    console.log('next curr slide = '+current_slide);

    pause_bool = false;
    clearTimeout(timer_id);
    if(current_slide < json_global.slides.length-1)
        loadSlides(current_slide+1,false);
}

function previous(){
    // console.log('prev jso len = '+json_obj_slides_length);

    pause_bool = false;
    clearTimeout(timer_id);
    if(current_slide > 0)
        loadSlides(current_slide-1,false);
}
