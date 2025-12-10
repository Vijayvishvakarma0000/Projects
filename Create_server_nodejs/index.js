let http = require('http');

let server = http.createServer((req, res) => {
    if(req.url=="/news"){//http://localhost:8000/news

        let obj ={
            status:1,
            data: [
                {
                   newsChanaelname:"newsnation",
                   title:"animal" 
                   
                }
            ]
        };
         res.setHeader('Content-Type', 'application/json');
   res.end(JSON.stringify(obj));
    }
     else {
        res.statusCode = 404;
        res.end("Page Not Found");
    }
    
})

console.log("jay sree ram"+"100")

server.listen(8000, () => {
    console.log("Server running at http://localhost:8000");
});
