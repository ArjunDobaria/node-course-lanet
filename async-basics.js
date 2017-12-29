const axios = require("axios");
// const http = require('http');
// var server  = http.createServer((req,res) => {
//     res.writeHead(200,{"content-type":"text/html"});
//     res.end("Welcome to my new page..!!");
// });
// server.listen(8080,() => console.log("Server is started..!!"));
// const geocode = require('./geocode/geocode.js');
// const request = require("request");
const yargs = require("yargs");
// const net = require("net");
// const fs = require("fs");
// const events = require("events");
// const domain = require("domain").create();
// const path = require("path"); //extname-extenstion  //basename-full path
// var emitors = new events.EventEmitter();
// emitors.on("myEvent",(username)=>console.log("My Event is Fired..!!", username));
// emitors.emit("myEvent","Arjun");
// emitors.removeListener("myEvent","Arjun")
// emitors.emit("myEvent","Arjun");
// domain.run(() => {
//     fs.readFile("data.txt","utf-8",(error,data) => {
//         if(error){
//             throw error;
//         }

//         console.log(data);
//      })

// })
// domain.on("error",()=> console.log("The Error is raised"));

// console.log("File Name: ", __filename);
// console.log("Dir Name: ", __dirname);
// console.log("Dir Name: ", process.cwd());
// console.log("Dir Name: ", process.cwd());
// process.on("uncaughtException", error => console.log("The Error is raised"));

const args = yargs
  .options({
    a: {
      describe: "This is for address",
      alias: "address",
      demand: true,
      string: true
    }
  })
  .help().argv;
var address = encodeURIComponent(args.address);
var url = `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`;

axios
  .get(url)
  .then(response => {
    if (response.data.status === "ZERO_RESULTS") {
      throw new Error("Unable to connect...!!!");
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var url2 = `https://api.darksky.net/forecast/7e7282cdaf9cec01b12ff32685876e2a/${lat},${lng}`;
    console.log("Location : " ,response.data.results[0].formatted_address);
    return axios.get(url2);
  })
  .then(response => {
    if (response.status === 200) {
      console.log("Current wether : " ,response.data.currently.temperature);
    } else {
      throw new Error(response.statusText);
    }
  })
  .catch(e => {
    if (e.code === "ENOTFOUND") {
      console.log("same msg as above");
    } else {
      console.log(e.message);
    }
  });
// geocode.findAddress(address,(errorMessage,result) =>
// {
//     if(errorMessage)
//     {
//         console.log(errorMessage);
//     }
//     else
//     {
//         console.log(JSON.stringify(result,undefined,2));
//     }
// });
// console.log(encodeURIComponent(args.address));
