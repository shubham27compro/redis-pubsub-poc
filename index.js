var express = require('express');
var redis = require('redis');

var REDIS_PORT = process.env.REDIS_PORT || 6379;

// var publisher = redis.createClient(REDIS_PORT);

var publisher = redis.createClient({
  host: 'redis-12194.c93.us-east-1-3.ec2.cloud.redislabs.com',
  port: 12194,
  password: 'WwcrwB4yFbu7FhCOF7CDAMPD6NqVqw0l'
});

var app = express();

app.use(express.json());


app.get('/publish/:message', function (req, res, next) {
  console.log('Publishing message...');
  var message = req.params.message;
  publisher.publish("user-notify", JSON.stringify(message));
  publisher.publish("my-channel", JSON.stringify(message));
  res.send(`Publishing message :${message} using Redis`);
});

app.listen(3000, () => {
  console.log(`App listening on PORT 3000...`);
});