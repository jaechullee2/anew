const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const request = require("request")
const moment = require("moment")
const dateutil = require("data-utils")
const mongoClient = require("mongodb").MongoClient

let day = new Date().toLocaleDateString('sv').replaceAll('-','');

var keys = "zOSoQ08xkXDIScQh51faAxPVCI4LZSvBGgPS6TiiW5sgQ%2FxZvuFhX%2BEDpiMd4TXYpqbJUheWH9xYmsOI6He9ig%3D%3D";
var url = "http://apis.data.go.kr/1360000/WthrChartInfoService/getSurfaceChart";

var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + keys;
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
queryParams += '&' + encodeURIComponent('code') + '=' + encodeURIComponent('3');
queryParams += '&' + encodeURIComponent('time') + '=' + encodeURIComponent(day);

// define schema
var DataSchema = mongoose.Schema({
    day_v1 : String,
    imgSrc_v1 : String,
    imgSrc_v2 : String
})

// create model with mongodb collection and schema
var Data = mongoose.model('weather', DataSchema);

// getdata
router.get('/getdata', function(req, res, next) {
    request({
            url : url + queryParams,
            method : "GET"
    }, function (error, response, body) {
        Data.find({}).deleteOne().exec();
        if (error) console.log(error)
        let data = JSON.parse(body)
        let imgSrcArr = data['response']['body']['items']['item'][0]['man-file'].split(',');
        let imgSrc1 = imgSrcArr[0].slice(1);
        let imgSrc2 = imgSrcArr[1].trim().slice(0, -1);
        console.log(imgSrc1);
        console.log(imgSrc2);
        //console.log(data['response']['body']['items']['item'])
        console.log(data['response']['body']['items']['item'][0]['man-file'].split(','))
        var template = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Result</title>
            <meta charset="utf-8">
        </head>
        <body>
            <table border="1" margin: auto; text-align : center;>
            <tr>
                <th>이미지1</th>
                <th>이미지2</th>
            </tr>
                <tr>
                    <th>${imgSrc1}</th>
                    <th>${imgSrc2}</th>
                </tr>
            </table>
            <img src= "${imgSrc1}" width="500" height="500"></img> <p>
            <img src= "${imgSrc2}" width="500" height="500"></img> <p>
        </body>
        </html>
        `;
        res.end(template)
        
        var newData = new Data({day_v1 : day, imgSrc_v1 : imgSrc1, imgSrc_v2 : imgSrc2})
        newData.save(function(err, result) {
            if (err) return console.error(err)
            console.log(new Date(), result)
        })
    })
})

//list
router.get('/list', function(req, res, next) {
    Data.findOne({}, function(err, docs) {
        if(err) console.log('err');
        console.log(docs);
        res.writeHead(200);
        var template = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Result</title>
            <meta charset="utf-8">
        </head>
        <body>
            <table border="1" margin: auto; text-align : center;>
            
            </table>
            <img src= "${docs['imgSrc_v1']}" width="500" height="500"></img> <p>
            <img src= "${docs['imgSrc_v2']}" width="500" height="500"></img> <p>
        </body>
        </html>
        `;
        res.end(template);
    })
})

module.exports = router;
