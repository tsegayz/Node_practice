// a module used to read and write a data in the file system. 'fs' stands for file system
// return an object with alot of functions

const http = require("http"); // a module that gives us a networking capability
const fs = require("fs"); // accessing the file system module
const url = require("url"); // a module for routing
const path = require("path");
const replaceTemplate = require("./module/replaceTemplate"); // requiering my own modules



const slugify = require("slugify");
const { json } = require("stream/consumers");

///////////////////////////// file
//// reading a file synchronously
//////////////// specify the file location and file encoding
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// /// writing into a file by creating a file
// const textOut = `This is what is known about the avocado: ${textIn}.\nCreated on ${Date.now()} `;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log(textOut)

// Synchronus - each statment is executed line by line
// is a blocking code beacuse each statment waits for the previous one to finish

// asynchronus - non-blocking
// is built around a call back function
/// reading a file aysnchronous 
///////////////////////////////////// call back function
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("your file is written");
//       });
//     });
//   });
// });
// console.log("Reading file.....");

////////////////////////////////////////////////////
////////////////////////////////////////////////////

/////////ROUTING
//// is performing different actions for different URL

////////// An API
// - is a service from which we can request some data

// const data = fs.readFileSync("./dev-data/data.json", "utf-8");
// const dataObj = JSON.parse(data);

// console.log(slugify("Fresh Avocado", { lower: true })); // changing the slug of the avocado
// const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
// console.log(slugs);

// /////// Reading the templates only once so as to avoid the continuous reading when a request is made
// const tempOverview = fs.readFileSync(
//   `${__dirname}/templates/template-overview.html`,
//   "utf-8"
// );
// const tempProduct = fs.readFileSync(
//   `${__dirname}/templates/template-product.html`,
//   "utf-8"
// );
// const tempCard = fs.readFileSync(
//   `${__dirname}/templates/template-card.html`,
//   "utf-8"
// );
// //////////////////////////////////////////////////////////
// // CREATING A WEB SEVER THAT CAN SEND AND ACCEPT REQUESTS

// const server = http.createServer((req, res) => {
//   // res.end("hello from server"); // a call back fun ction that is always called when a request is made
//   const { query, pathname } = url.parse(req.url, true);

//   //////OVERVIEW PAGE
//   if (pathname === "/" || pathname === "/overview") {
//     res.writeHead(200, {
//       "content-type": "text/html",
//     });

//     //// Map method accepts a call back function, which takes an argument that is the current element, then it reutrns sth that can be stored in a variable
//     const cardsHtml = dataObj
//       .map((el) => replaceTemplate(tempCard, el))
//       .join(""); /// a method that is used to bring the object to a single organized string
//     const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
//     res.end(output);
//   }
//   ///////PRODUCT PAGE
//   else if (pathname === "/product") {
//     res.writeHead(200, {
//       "content-type": "text/html",
//     });
//     const product = dataObj[query.id];
//     const output = replaceTemplate(tempProduct, product);
//     res.end(output);
//   }
//   ////////API
//   else if (pathname === "/api") {
//     res.writeHead(200, {
//       "content-type": "application/json",
//     });
//     res.end(data);
//   }
//   /////////ERROR /NOT FOUND
//   else {
//     res.writeHead(404, {
//       "content-type": "text/html",
//       "my-own-header": "mimemamu",
//     });
//     res.end("<h1>page not found </h1>");
//   }
// });

const tempOverview = fs.readFileSync( `${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync( `${__dirname}/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync( `${__dirname}/templates/template-card.html`, 'utf-8');


const data = fs.readFileSync( `${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data)

const server = http.createServer( (req, res) => {

  const {query, pathname} = url.parse(req.url, true);


  if(pathname === '/overview' || pathname === '/') {
    res.writeHead( 200, {
      'Content-type' : 'text/html'
    });

    const cardsHtml = dataObj.map( el => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml)
    res.end(output);


    //// 
  } else if (pathname === '/product') {

    res.writeHead( 200, {
      'Content-type' : 'text/html'
    });

    const product = dataObj[query.id];
    const output = replaceTemplate( tempProduct, product);
    res.end(output);


  } else if( pathname === '/api') {
    res.writeHead( 200, {
      'Content-type' : 'application/json'
    });
    res.end(data);
  }


  else {
    res.writeHead( 404, {
      'Content-type' : 'text/html'
    });
    res.end('<h1> Page not found </h1>');
  }
});

server.listen( 8000, '127.0.0.1', () => {
  console.log("listening to request on port 8000")
});

// ///////////// 8000 is a port(a sub address in a host), local host is the current computer
// // this method listens to incoming request and starts the server
// server.listen(8000, "127.0.0.1", () => {
//   console.log("listening to requests on port 8000");
// });
