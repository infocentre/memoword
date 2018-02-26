const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
var request = require('request')
var cors = require('cors')

var GetDictFun = function (req, res) {
  // var resData = null
  request('https://glosbe.com/gapi/translate?from=eng&dest=kor&format=json&pretty=true&phrase=' + req.query.word, function (error, response, body) {
    console.log('error:', error) // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode) // Print the response status code if a response was received
    console.log('body:', body) // Print the HTML for the Google homepage.
    res.json(body)
  })
}

exports.GetDict = functions.https.onRequest((req, res) => {
  var corsFun = cors()
  corsFun(req, res, function () {
    GetDictFun(req, res)
  })
})
