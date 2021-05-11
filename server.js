/*********************************/
/* Set up the static file server */
let static = require('node-static');

/* Set up the http server library */
let http = require('http');

/* Assume that we are running on Heroku */
let port = process.env.PORT;
let directory = __dirname + '/public';

/* If we are not on Heroku, we need to adjust out port and directory */
if ((typeof port == 'undefined') || (port === null)){
    port = 8080;
    directory = './public';
}

/* Set up our statid file web server to deliver files from the filesystem */
let file = new static.Server(directory);

let app = http.createServer(
    function(request,response) {
        request.addListener('end',
            function(){
                file.serve(request,response);
            }
        ).resume();       
    }
).listens(port);

console.log('The Server is running');