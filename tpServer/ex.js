"use strict";
// const path = require('path');
const querystring = require('query-string');

// // var a = '/\.\.\/hello?name=saoasaa';
// var a = '/exit';
// // var a  = '/';
// console.log('a = '+a);
// console.log('path '+path.normalize(a));
// let avoid_parent_dir = path.normalize(a).replace(/([\/\\]\.\.)+/g,'');
// console.log('avoid = '+avoid_parent_dir);
// console.log(/^([\/\\]hello\?name\=)/.exec('/hello?name=saoasaaso'));
// if(/^([\/\\]hello\?name\=)/.test(avoid_parent_dir)){
//     console.log('oi');
//     avoid_parent_dir = avoid_parent_dir.replace(/^([\/\\]hello\?name\=)/,'');
//     console.log('a = '+avoid_parent_dir);
// }

// if(/^([\/\\]exit)/.test(avoid_parent_dir)){
//     console.log('oi2');
// }
// if(/(\\|\/)/.test(avoid_parent_dir)){
//     console.log('oi3');
// }

// var b = 's a é';
// var c = escape(b);

// console.log(c);

// console.log(querystring.parse(c));
// console.log(unescape(c));

// var author_name = 'J. wiart';
// let author_name = 'É. Drouet';
let author_name = 'JLF:MediaSync-2017';

author_name = escape(author_name);
console.log(author_name);
let regex = new RegExp('^'+author_name+'$','i');

console.log(regex.test('j. wiart'));

// console.log('nao');