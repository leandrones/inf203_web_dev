"use strict";
function countWords(a_string){
    // console.log(a_string.split(' '));
    let words = a_string.split(' ');

    var word_count = {};

    words.forEach(
        (word) => {
            if(word_count.hasOwnProperty(word)){
                word_count[word]++;
            }
            else{
                word_count[word] = 1;
            }
        }
    )

    // console.log(word_count);
    
    return word_count;
}

function WordList(a_string){
    this.str = a_string;
    this.maxCountWord = () => {
        
    }
}


let s = 'function shall return an object whose properties are the words and the values ​​of these properties are the occurrence';

countWords(s);