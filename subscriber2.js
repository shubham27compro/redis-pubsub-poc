const express = require('express');
const redis = require('redis');

const app = express();

var REDIS_PORT = process.env.REDIS_PORT || 6379;

// var subscriber = redis.createClient(REDIS_PORT);
var subscriber = redis.createClient({
    host: 'redis-12194.c93.us-east-1-3.ec2.cloud.redislabs.com',
    port: 12194,
    password: 'WwcrwB4yFbu7FhCOF7CDAMPD6NqVqw0l'
});

subscriber.on("message", (channel, message) => {
    console.log("Received data :" + message);
    console.log("From channel: " + channel);
})

subscriber.subscribe("user-notify");

app.get('/', (req, res) => {
    res.send("Subscriber One");
})

app.listen(3007, () => {
    console.log("server is listening to port 3007");
})