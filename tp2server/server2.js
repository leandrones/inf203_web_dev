"use strict";

const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const bodyparser = require('body-parser');

// const url = require('url');
// const util = require("util");
// console.log(util.inspect());

// const http = require('http');
// const path = require('path');
// const querystring = require('query-string');

const port = process.argv[2];

console.log('PORT = ',port);

const app = express();

app.use(morgan('common'));
app.use(bodyparser.json());

let fileName = 'db.json';

let data = fs.readFileSync(fileName,'utf8');
let db = JSON.parse(data);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/exit',(req,res) => {
    res.end('Bye!');
    setTimeout(()=>{process.exit(0)}, 2000);
});

app.get('/restore', (req,res) => {
    data = fs.readFileSync(fileName,'utf8');
    db = JSON.parse(data);
    console.log(db[0]);
    res.end('Restored');
});

app.get('/papercount', (req, res) => {
    res.set('Content-type','text/plain');
    res.end(db.length.toString());
});

app.get(/^\/author/, (req , res) => {
    console.log(req.method+' '+req.url);

    // let url_parse = url.parse(req.url);
    // console.log(url_parse);

    let author_name = req.url.replace(/^\/author\//,'');
    author_name = decodeURI(author_name);
    console.log('author name = '+author_name);

    let publication_num = 0;

    for (const book of db) {
        for (const author of book.authors) {
            let regex = new RegExp(author_name+'$','i');
            if(regex.test(author)){
                publication_num++;
                // console.log('found '+publication_num);
            }
        }
    }

    res.set('Content-type','text/plain');
    res.end(publication_num.toString());
});

app.get(/^\/papersfrom/, (req , res) => {
    console.log(req.method+' '+req.url);

    // let url_parse = url.parse(req.url);
    // console.log(url_parse);

    let author_name = req.url.replace(/^\/papersfrom\//,'');
    author_name = decodeURI(author_name);
    console.log('author name = '+author_name);

    let publications = [];
    for (const book of db) {
        for (const author of book.authors) {
            // let regex = new RegExp('^'+author_name+'$','i');
            let regex = new RegExp(author_name+'$','i');
            if(regex.test(author)){
                publications.push(book);
                // console.log('found '+publication_num);
            }
        }
    }

    res.set('Content-Type', 'application/json');
    res.end(JSON.stringify(publications));
});

app.get(/^\/titles/, (req , res) => {
    console.log(req.method+' '+req.url);


    let author_name = req.url.replace(/^\/titles\//,'');
    author_name = decodeURI(author_name);
    console.log('author name = '+author_name);

    let titles = [];
    for (const book of db) {
        for (const author of book.authors) {
            let regex = new RegExp(author_name+'$','i');
            if(regex.test(author)){
                let title_obj = book.title;
                // let title_obj = {'title': book.title};
                titles.push(title_obj);
                console.log(titles);
            }
        }
    }

    res.set('Content-Type', 'application/json');
    res.end(JSON.stringify(titles));
});

app.get(/^\/reference/, (req , res) => {
    console.log(req.method+' '+req.url);

    // let url_parse = url.parse(req.url);
    // console.log(url_parse);

    let key_name = req.url.replace(/^\/reference\//,'');
    key_name = decodeURI(key_name);
    console.log('key name = '+key_name);

    let publication;
    for (const book of db) {
        let regex = new RegExp('^'+key_name+'$',);
        if(regex.test(book.key)){
            publication = book;
            console.log(publication);
            break;
        }
    }

    res.set('Content-Type', 'application/json');
    res.end(JSON.stringify(publication));
});

app.delete(/^\/reference/, (req , res) => {
    console.log(req.method+' '+req.url);

    let key_name = req.url.replace(/^\/reference\//,'');
    key_name = decodeURI(key_name);
    console.log('key name = '+key_name);

    // let publication;
    for (const i in db) {
        let regex = new RegExp('^'+key_name+'$',);
        if(regex.test(db[i].key)){
            // publication = db[i];
            db.splice(i,1);
            console.log(db[i]);
            break;
        }
    }

    // res.set('Content-Type', 'application/json');
    // res.end(JSON.stringify(publication));
    res.end();
});

app.post(/^\/reference/, (req , res) => {
    console.log(req.method+' '+req.url);
    // console.log(req.body);

    db.push(req.body);

    console.log(db[db.length-1]);
    res.json();
});

app.put(/^\/reference/, (req , res) => {
    console.log(req.method+' '+req.url);

    let key_name = req.url.replace(/^\/reference\//,'');
    key_name = decodeURI(key_name);
    console.log('key name = '+key_name);

    for (const book of db) {
        let regex = new RegExp('^'+key_name+'$');
        if(regex.test(book.key)){
            for(const prop in req.body){
                if(book.hasOwnProperty(prop) && req.body.hasOwnProperty(prop)){
                    book[prop] = req.body[prop];
                }
            }
            console.log(book);
            break;
        }
    }

    // res.set('Content-Type', 'application/json');
    // res.end(JSON.stringify(modification));
    res.json();
});


app.listen(port, () => {
    console.log('Example app listening on port '+port+'!');
});
