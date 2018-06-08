#!/usr/bin/env /usr/local/bin/node

const AppInfo = {
    title: 'Weather',
    version: 'v1.2',
    author: 'linchengzzz',
    authorGithub: 'https://github.com/linchengzzz/bitbar-weather.git',
    desc: 'a bitbar weather plugin',
    dependencies: 'node.js',
}

const crypto = require('crypto');
const querystring = require('querystring');
const request = require('request-promise');
const bitbar = require('bitbar');
const http = require('http');
const https = require('https');
const async = require('async');
const User = {
    Uid: 'UB46F4FDA0',
    Key: '1ncn52cwwvipmjui'
}
//修改显示颜色
const color = 'white';
//轻易天气类--返回 promise 实例
class Weather {
    constructor(uid, key) {
        this.uid = uid;
        this.key = key;
    }
    getSignatureParams() {
        const params = {}
        params.ts = Math.floor((new Date()).getTime() / 1000);
        params.ttl = 300;
        params.uid = this.uid;
        const str = querystring.encode(params);
        params.sig = crypto.createHmac('sha1', this.key).update(str).digest('base64');
        return params;
    }
    getWeatherNow(location) {
        var params = this.getSignatureParams();
        params.location = location;
        return request({
            url: 'https://api.seniverse.com/v3/weather/now.json',
            qs: params,
            json: true
        });
    }
}
//获取 IP
function getIP(callback) {
    const url = `http://fp.ip-api.com/json`
    http.get(url, res => {
        var result = ''
        res.on("data", function (data) {
            result += data;
        })
        res.on("end", function () {
            callback(null, result);
        })
    })
}

//获取地理位置
function getLocation(ip, callback) {
    ip = JSON.parse(ip).query;
    const url = `http://ip-api.com/json/${ip}?fields=520191&lang=en`
    http.get(url, res => {
        var result = ''
        res.on("data", function (data) {
            result += data;
        })
        res.on("end", function () {
            callback(null, result);
        })
    })
}

//获取当前天气
function getWeather(location, callback) {
    location = JSON.parse(location).city;
    new Weather(User.Uid, User.Key).getWeatherNow(location).then(result => callback(null, result))
}

async.waterfall([
    getIP,
    getLocation,
    getWeather
], function (err, result) {
    const data = result.results[0];
    const location = data.location;
    const weather = data.now;
    let icon = ''
    switch (weather.code) {
        case '0': case '2': case '38':
            icon = '☀️';
            break;
        case '1': case '3':
            icon = '🌙';
            break;
        case '4': case '9':
            icon = '☁️';
            break;
        case '5': case '6': case '7': case '8':
            icon = '⛅️';
            break;
        case '10': case '11': case '12': case '13': case '14': case '15':
            icon = '🌧';
            break;
        case '16': case '17': case '18':
            icon = '⛈';
            break;
        case '34': case '35': case '36':
            icon = '🌩';
            break;
        case '19': case '20': case '37':
            icon = '🌨';
            break;
        case '21': case '22':
            icon = '❄️';
            break;
        case '23': case '24': case '25':
            icon = '☃️';
            break;
        case '32': case'33': case'34': case'35': case'36':
            icon = '🌪️';
            break;
        case '26': case'27': case'28': case'29': case'30': case'31':
            icon = '🌫️';
            break;
        default:
            icon = 'N/A'
            break;
    }
    bitbar([{
            text: `${location.name}:${icon} ${weather.temperature}℃`,
            dropdown: false
        },
        bitbar.sep,
        {
            text: `位置：${location.name}`,
            color,
        },
        {
            text: `天气：${weather.text}`,
            color,
        },
        {
            text: `温度：${weather.temperature}℃`,
            color,
        },
    ]);
});