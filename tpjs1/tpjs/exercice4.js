"use strict";

let ex3 = require ('./exercice3');
let Student = ex3.Student;
let ForeignStudent = ex3.ForeignStudent;

const fs = require('fs');

class Promotion {
    constructor(students){
        this.students = students;
    }

    add(student){
        this.students.push(student);
    }

    size(){
        return this.students.length;
    }

    get(i){
        if (i < this.students.length){
            return this.students[i];
        }
        return undefined;
    }

    print(){
        let content = '';
        for(let i in this.students){
            content = content + this.students[i].print();
        }
        return content;
    }

    write(){
        let json_string = JSON.stringify(this);
        
        // console.log(json_string);
        
        return json_string;
    }

    read(str){
        let json_obj = JSON.parse(str);
        
        // console.log('stud = '+json_obj.students);

        let json_string = JSON.stringify(json_obj);

        let stud_arr = [];
        for (let i in json_obj.students){
            if(json_obj.students[i].hasOwnProperty('nationality')){
                stud_arr.push(new ForeignStudent(
                    json_obj.students[i].lastName,
                    json_obj.students[i].firstName,
                    json_obj.students[i].id,
                    json_obj.students[i].nationality
                ));
            }
            else{
                stud_arr.push(new Student(
                    json_obj.students[i].lastName,
                    json_obj.students[i].firstName,
                    json_obj.students[i].id
                ));
            }
            // stud_arr[i].print();           
        }

        let promotion = new Promotion(stud_arr);

        return promotion;
    }

    /*saveToFile(fileName){
        let write_stream = fs.createWriteStream(fileName);

        let json_string = this.write();

        write_stream.write(json_string);
        write_stream.end('');
    }*/
    saveToFile(fileName){
        let json_string = this.write();
        fs.writeFileSync(fileName,json_string,'utf8');
    }

    readFromFile(fileName){
        var data = fs.readFileSync(fileName,'utf8');
        
        let prom = this.read(data);
        
        return prom;
    }
}

let s1 = new Student('Silva','Joao',1998);
let s2 = new ForeignStudent ("Dupond", "John", 1835,'American');
let s3 = new ForeignStudent('Chang','Ling',2,'Chinese');
let s4 = new Student('Ma','Jo',3);

let students = [s1,s2,s3,s4];
// console.log(students);

let promotion = new Promotion(students);

promotion.add(new Student('Ka','Bob',5));
// console.log(promotion.get(4));
// console.log(promotion.size());

// promotion.print();

let json_string = promotion.write();
let p2 = promotion.read(json_string);
// p2.print();
// console.log('st main = '+promotion.students);

promotion.saveToFile('./promotionjson.json');
let p3 = promotion.readFromFile('./promotionjson.json');
p3.print();

exports.Promotion = Promotion;