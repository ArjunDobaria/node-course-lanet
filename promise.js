const request = require("request");

var asyncAdd = (address) => {
  return new Promise((resolve, reject) => {
    request(
      {
        // url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
        url: `https://api.darksky.net/forecast/7e7282cdaf9cec01b12ff32685876e2a/${address}`,
        json: true
      },
      (error, response, body) => {
        if (error) {
          reject("Unable to connect");
        } else if (body.code === 400) {
          reject(body.error);
        } else {
          resolve({
            // Body:body,
            Latitude: body.latitude,
            Longitude: body.longitude,
            Summary: body.currently.summary,
            Temprature: body.currently.temperature
            // console.log(`Latitude:${JSON.stringify(body.latitude)}`);
            // console.log(`Longitude:${JSON.stringify(body.longitude)}`);
            // console.log(`Summary:${JSON.stringify(body.currently.summary)}`);
          });
        }
      }
    );
    // setTimeout(() => {
    //     if(typeof a === 'number' && typeof b === 'number')
    //     {
    //         resolve(a+b);
    //     }
    //     else
    //     {
    //         reject('The arguments must be number');
    //     }
    // },1500);
  });
};

asyncAdd('000000')
  .then(res => {
    console.log("Result : ", JSON.stringify(res, undefined, 2));
  })
  .catch(errorMessage => {
    console.log(errorMessage);
  });

// var promise = new Promise((resolve,reject) => {
//     setTimeout(()=>{
//         resolve('Hey, Its Worked..!')},
//         2500
//     );
// });

// promise.then((message)=>{
//     console.log(`Success : ${message}`);
// }, (errorMessage)=> {
//     console.log(`Error : ${errorMessage}`);
// })
