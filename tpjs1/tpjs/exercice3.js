"use strict";

class Student {
    constructor(lastName, firstName, id){        
        this.lastName = lastName;
        this.firstName = firstName;
        this.id = id;
    }

    print(){
        let content = 'student: '+this.lastName+', '+this.firstName+', '+this.id;
        console.log(content);
        return content;
    }
}

class ForeignStudent extends Student {
    constructor(lastName, firstName, id, nationality){
        super(lastName,firstName,id);
        this.nationality = nationality;
    }

    print(){
        // let content = super.print();
        let content = 'student: '+this.lastName+', '+this.firstName+', '+this.id + ', '+ this.nationality;

        console.log(content);
        
        return content;
    }
}

// var student = new ForeignStudent ("Dupond", "John", 1835,'American');
// student.print();

exports.Student = Student;
exports.ForeignStudent = ForeignStudent;