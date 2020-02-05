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
        if(typeof this.students !== 'undefined'){
            return this.students.length;
        }
        return undefined;
    }

    get(i){
        if(typeof this.students !== 'undefined'){
            if (i < this.students.length){
                return this.students[i];
            }
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
        let json_string = JSON.stringify(this.students);
                
        return json_string;
    }

    read(str){
        console.log(str);
        let json_obj = JSON.parse(str);
        let keys = Object.keys(json_obj);

        if(typeof this.students !== 'undefined'){
            for(let i in this.students){
                this.students[i].lastName = json_obj.keys[i].lastName;
                this.students[i].firstName = json_obj.keys[i].firstName;
                this.students[i].id = json_obj.keys[i].id;
            }
            
            for (let i = this.students.length; i < keys.length; i++){
                if(json_obj.keys[i].hasOwnProperty('nationality')){
                    this.students.push(new ForeignStudent(
                        json_obj.keys[i].lastName,
                        json_obj.keys[i].firstName,
                        json_obj.keys[i].id,
                        json_obj.keys[i].nationality
                    ));
                }
                else{
                    this.students.push(new Student(
                        json_obj.keys[i].lastName,
                        json_obj.keys[i].firstName,
                        json_obj.keys[i].id
                    ));
                }
            }
        }
        else{
            console.log('OOOI 1');
            this.students = [];
            for (let i in keys){
                console.log('OOOI 2');
                if(json_obj.keys[i].hasOwnProperty('nationality')){
                    this.students.push(new ForeignStudent(
                        json_obj.keys[i].lastName,
                        json_obj.keys[i].firstName,
                        json_obj.keys[i].id,
                        json_obj.keys[i].nationality
                    ));
                }
                else{
                    this.students.push(new Student(
                        json_obj.keys[i].lastName,
                        json_obj.keys[i].firstName,
                        json_obj.keys[i].id
                    ));
                }
            }
        }
    }

    saveToFile(fileName){
        let json_string = this.write();
        fs.writeFileSync(fileName,json_string,'utf8');
    }

    readFromFile(fileName){
        let data = fs.readFileSync(fileName,'utf8');
        
        // console.log('data = '+data);
        
        this.read(data);
        
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

// let json_string = promotion.write();
// promotion.read(json_string);

// console.log('st main = '+promotion.students);

promotion.saveToFile('./promotionjson.json');
// let promotion = new Promotion();
// promotion.readFromFile('./promotionjson.json');
// promotion.print();

exports.Promotion = Promotion;