const eventEmitter = require("events");
const server = require("http").createServer();
const fs = require("fs");

// to actually use the event emitting in real app we use an ES6 version that is more organized
// class sales extends eventEmitter{
//     constructor() {
//         super();
//     }
// }

// // once the event emitter is created we will subsscribe to it to listen to the emittion of an event

// const myEmitter = new eventEmitter;

// myEmitter.on( "sales", () => {
//     console.log("new sales have arrived");
// });

// myEmitter.on( "sales", stock => {
//     console.log(`there are ${stock} items left in the stock curretly`);
// });

// // then we will emit the event and see what tags along with it
// myEmitter.emit("sales");


// in the above method we emit event ourselves because we created our custom event emitter
// But when using a built in node module, the functions in 
// the module will emit the event so we should only listen to the events


// const server = http.createServer();

// server.on("request", (req, res) => {
//     console.log('request recieved');
//     res.end("Request recieved")
// });

// server.on("close", () => {
//     console.log('server closed');
// });

// server.listen(8000, "127.0.0.1", () => {
//     console.log('listening on port 8000');
// })


//////////////////// WAYS IN WHICH WE CAN READ A FILE AND SEND IT TO THE CLIENT

server.on( "request", (req, res) => {
    fs.readFile("", (err, data) => {
        if(err) console.log(err);
        res.end(data);
    })
})

server.listen(8000, "127.0.0.1", () => {
    console.log('listening on port 8000');
})