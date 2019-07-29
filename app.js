"use strict";
const http = require('http');
const https = require('https');
/**
 * 
 * @param {String} url 
 * @param {Function} callback
 */
const myRequest = (url, callback) => {
  /*
  create your own request module here.
  It should take a url to make a http GET request, and a callback function with two arguments;
  1. error (String: if an error occurred),
  2. response(Object; includes the body & statusCode of the request)
  */

  if (url.includes('https'))
    https.get(url, (res) => {
      let error;
      if (res.statusCode !== 200) {
        error = new Error('Request Failed.\n' +
          `Status Code: ${statusCode}`);
      } else if (!/^application\/json/.test(res.headers['content-type'])) {
        error = new Error('Invalid content-type.\n' +
          `Expected application/json but received ${contentType}`);
      }
      if (error) {
        console.error(error.message);
        // Consume response data to free up memory
        res.resume();
        return;
      }
      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => rawData += chunk);
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          console.log({
            statusCode: res.statusCode,
            body: parsedData
          });
          callback(null, {
            statusCode: res.statusCode,
            body: parsedData
          });
        } catch (e) {
          console.error(e.message);
        }
      }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
      });
    })
  else http.get(url, (res) => {
    let error;
    if (res.statusCode !== 200) {
      error = new Error('Request Failed.\n' +
        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(res.headers['content-type'])) {
      error = new Error('Invalid content-type.\n' +
        `Expected application/json but received ${contentType}`);
    }
    if (error) {
      console.error(error.message);
      // Consume response data to free up memory
      res.resume();
      return;
    }
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        console.log({
          statusCode: res.statusCode,
          body: parsedData
        });
        callback(null, {
          statusCode: res.statusCode,
          body: parsedData
        });
      } catch (e) {
        console.error(e.message);
      }
    }).on('error', (e) => {
      console.error(`Got error: ${e.message}`);
    });
  })
};

module.exports = myRequest;