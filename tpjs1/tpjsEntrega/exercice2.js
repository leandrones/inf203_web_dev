"use strict";
function countWords(a_string){
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
    return word_count;
}

class WordList {
    constructor(a_string){
        this.str = a_string;
        this.words_occur = countWords(a_string);
        this.words_arr = this.getWords();
        this.name_occur_arr = this.nameOccurrenceArrayCreator();
    }

    nameOccurrenceArrayCreator(){
        let name_occur_arr = [];

        name_occur_arr = Object.keys(this.words_occur).map((key) => {
            return {
                name : key,
                occurrences : this.words_occur[key],
            };
        });
        return name_occur_arr;
    }

    getWords(){
        let words_arr = Object.getOwnPropertyNames(this.words_occur);
        words_arr.sort((a,b) => {
            return (a.localeCompare(b));
        });
        return words_arr;
    }

    maxCountWord(){
        let max_occurrences = -1;
        let max_word = undefined;
        for (let property in this.words_occur){
            if(this.words_occur.hasOwnProperty(property)){
                if (this.words_occur[property] > max_occurrences){
                    max_occurrences = this.words_occur[property];
                    max_word = property;
                }
                else if (this.words_occur[property] == max_occurrences){
                    if(property.localeCompare(max_word) < 0){
                        max_word = property;
                    }
                }
            }
        }
        return max_word;
    }

    minCountWord() {
        let min_occurrences = Number.MAX_SAFE_INTEGER;
        let min_word = undefined;
        for (let property in this.words_occur){
            if(this.words_occur.hasOwnProperty(property)){
                if (this.words_occur[property] < min_occurrences){
                    min_occurrences = this.words_occur[property];
                    min_word = property;
                }
                else if (this.words_occur[property] == min_occurrences){
                    if(property.localeCompare(min_word) < 0){
                        min_word = property;
                    }
                }
            }
        }
        return min_word;
    }

    getCount(word){
        for(let i in this.name_occur_arr){
            if(this.name_occur_arr[i].name.localeCompare(word) == 0){
                return this.name_occur_arr[i].occurrences;
            }
        }
        return -1;
    }

    applyWordFunc(f){
        return this.words_arr.map(f);
    }
}


exports.countWords = countWords;
exports.WordList = WordList;