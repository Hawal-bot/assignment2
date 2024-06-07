
class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}


let dataCollection = null;

const fs = require('fs');

//  function to read the contents of the "./data/students.json" file
function initialize() {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/students.json', 'utf8', (err, studentData) => {
            if (err) {
                reject("unable to read students.json"); // rejecting the promise 
                return;
            }
            let students = JSON.parse(studentData);

            fs.readFile('./data/courses.json', 'utf8', (err, courseData) => {
                if (err) {
                    reject("unable to read courses.json"); // rejecting the promise
                    return;
                }
                let courses = JSON.parse(courseData);
                
// creating a new instance of the Data class and assigning it to dataCollection using the data returned from your fs.readFile operations
                dataCollection = new Data(students, courses);
                resolve(); // invoking the resolve method for the promise to communicate back to a2.js that the operaKon was successful
            });
        });
    });
}


function getAllStudents() {
    return new Promise((resolve, reject) => {
        if (dataCollection.students.length > 0) {
            resolve(dataCollection.students);
        } else {
            reject("no results returned.");
        }
    });
}


function getCourses() {
    return new Promise((resolve, reject) => {
        if (dataCollection.courses.length > 0) {
            resolve(dataCollection.courses);
        } else {
            reject("no results returned.");
        }
    });
}


function getTAs() {
    return new Promise((resolve, reject) => {
        const TAs = dataCollection.students.filter(student => student.TA);
        if (TAs.length > 0) {
            resolve(TAs);
        } else {
            reject("no results returned.");
        }
    });
}


module.exports = { 
    initialize, 
    getAllStudents, 
    getCourses,
    getTAs 
};
