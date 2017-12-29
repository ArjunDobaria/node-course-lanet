const request = require("request");

var findAddress = (address,callback) => {

    request(
        {
        //   url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
        url : `https://api.darksky.net/forecast/7e7282cdaf9cec01b12ff32685876e2a/${address}`,
          json: true
        },
        (error, response, body) => {
            if(error)
            {
              callback('Unable to connect');
            }
            else if(body.status === "ZERO_RESULTS")
            {
              callback('Can not find this address by google maps..!');
            }
            else
            {
                callback(undefined,
                {
                    Latitude:body.latitude,
                    Longitude:body.longitude,
                    Summary:body.currently.summary,
                    Temprature:body.currently.temperature
                    // console.log(`Latitude:${JSON.stringify(body.latitude)}`);
                    // console.log(`Longitude:${JSON.stringify(body.longitude)}`);
                    // console.log(`Summary:${JSON.stringify(body.currently.summary)}`);
                });
              }
        }
      );   
};

process.on("uncaughtException", error => console.log(JSON.stringify(error, undefined, 2)));

module.exports = {findAddress};