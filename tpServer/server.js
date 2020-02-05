"use strict";

const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const querystring = require('query-string');

const port = process.argv[2] || 8000;

console.log('PORT = ',port);

const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'application/font-sfnt'
};

let names_memory = [];

try {
    http.createServer( (req,res) =>{
        console.log(req.method+' '+req.url);
        console.log('path = '+req.url);

        let url_parse = url.parse(req.url);
        let file_path = url_parse.pathname;

        console.log(url_parse);

        // const avoid_parent_dir = path.normalize(file_path).replace(/^(\.\.[\/\\])+/,'');
        let avoid_parent_dir = path.normalize(file_path);

        console.log('avoid = '+avoid_parent_dir);

        if(/^(\\|\/)$/.test(avoid_parent_dir)){
            console.log('Home!')
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.write('Server is working!');
            res.end();
        }

        else if(/^([\/\\]exit)/.test(avoid_parent_dir)){
            res.writeHead(200,{'Content-Type': 'text/html'});
            console.log('Bye!');
            res.write('Server terminated!');
            res.end();
            setTimeout(()=>{process.exit(0)},2000);
        }
        else if(/^([\/\\]hello)$/.test(avoid_parent_dir)){
            const query_obj = querystring.parse(url_parse.query);
            // query_obj.name = query_obj.name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            console.log(query_obj);
            res.writeHead(200,{'Content-type':'text/html; charset=utf-8'});
            res.end('Hello '+query_obj.name);
        }
        else if(/^([\/\\]hello2)/.test(avoid_parent_dir)){
            let old_names_mem = names_memory.slice();
            const query_obj = querystring.parse(url_parse.query);
            query_obj.name = query_obj.name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            console.log(query_obj);
            names_memory.push(query_obj.name);

            let names_str = '';
            for (const name of old_names_mem) {
                names_str += ' '+name+',';
            }
            names_str = names_str.replace(/.$/,'');
            console.log(names_str);

            res.writeHead(200,{'Content-type':'text/html; charset=utf-8'});
            res.end('Hello '+query_obj.name+","+' the following users have already visited this page:'+names_str);
        }
        else if (/^([\/\\]files)/.test(avoid_parent_dir)){
            avoid_parent_dir = avoid_parent_dir.replace(/^([\/\\]files)/,'');
            let full_path = path.join(__dirname,avoid_parent_dir);

            console.log('avoiddd = '+avoid_parent_dir);
            console.log('full path = '+full_path);

            if(! fs.existsSync(full_path)){
                console.log('File does not exist!')
                res.writeHead(404,{'Content-Type':"text/plain"});
                res.end("404 Not Found\n");
                // return;
            }
            else {
                if(fs.statSync(full_path).isDirectory()){
                    full_path += '/index.html';
                }
                else {
                    fs.readFile(full_path,(err,data)=>{
                        if(err){
                            res.statusCode = 500;
                            res.end('Error getting the file '+err);
                        }
                        else{
                            const ext = path.parse(full_path).ext;
                            res.writeHeader(200,{'Content-type': mimeType[ext] || 'text/plain'});
                            res.end(data);
                        }
                    });
                }
            }
        }
    }).listen(port);
}
catch(error){
    console.error(error);
}