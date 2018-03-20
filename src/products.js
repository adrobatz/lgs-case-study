var request = require("request");

var options = { method: 'GET',
  url: 'https://api-dev.luxurygaragesale.com/v1/products/',
  headers:
   { 'postman-token': '06c7c34c-7557-21cb-be69-18b90713a891',
     'cache-control': 'no-cache',
     'content-type': 'application/json' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
