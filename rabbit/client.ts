var fs = require('fs');
var {parse} = require('csv-parse');
var WebSocketClient = require('websocket').client;
var amqp = require('amqplib/callback_api');


var citit = [];

fs.createReadStream("./sensor.csv")
    .pipe(parse({delimiter: ",", from_line: 2}))
    .on("data", function (row) {
        citit.push(row);
        //console.log(citit);
    });
console.log("s-a ajuns aici");
console.log(citit);

var devideId= "637a626d5b40d90b8e2e5825";


var client = new WebSocketClient();

    client.on('connectFailed', function (error) {
        console.log('Connect Error: ' + error.toString());
    });

    client.on('connect', function (connection) {
        console.log('WebSocket Client Connected');
        connection.on('error', function (error) {
            console.log("Connection Error: " + error.toString());
        });
        connection.on('close', function () {
            console.log('echo-protocol Connection Closed');
        });
        connection.on('message', function (message) {
            if (message.type === 'utf8') {
               console.log("Received: '" + message.utf8Data + "'");
            }
        });
        citit = citit.reverse();

        var channel;
        var queue;
        function connect(){
            amqp.connect('amqps://rcrbcsxn:y9aq9GTDCdYt4zc4KIJfBo-WapRfQfb2@sparrow.rmq.cloudamqp.com/rcrbcsxn', function(error0, connection) {
                if (error0) {
                    console.log(error0);
                    //  throw error0;
                }
                connection.createChannel(function(error1, channel) {
                    var queue = 'hello';


                    channel.assertQueue(queue, {
                        durable: false
                    });
                    function sendNumber() {
                      //  if (connection.connected) {
                            //  connection.sendUTF(citit.pop().toString());
                            setTimeout(sendNumber, 1000);
                        //}

                        var myDate = Math.floor(Date.now() / 1000);
                        var numar  = citit.pop().toString();
                        var jsonformat = '{"timestamp": ' + myDate + ', "deviceId": ' + devideId + ', "measurementValue": ' + numar + '}';
                        channel.sendToQueue(queue, Buffer.from(jsonformat));
                        console.log(" [x] Sent %s", jsonformat);
                    }
                    sendNumber();
                });

                });

        }


        function sendNumber1() {
            if (connection.connected) {
              //  connection.sendUTF(citit.pop().toString());
                setTimeout(sendNumber1, 1000);
            }
                    var myDate = Math.floor(Date.now() / 1000);
                    var numar  = citit.pop().toString();
                    var jsonformat = {"timestamp": myDate, "deviceId": devideId , "measurementValue":  numar};
                    console.log("coada: " + this.queue);
                    console.log("channel: " + this.channel);
                   // this.channel.sendToQueue(this.queue, Buffer.from(numar));
                    console.log(" [x] Sent %s", jsonformat);
        }
        connect();
        //sendNumber();


});


client.connect('ws://localhost:8079/', 'echo-protocol');