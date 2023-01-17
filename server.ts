import config from "config";
import { Server } from "./server-config"
import userModel from "./dataBase/userdb";
import {Schema} from "mongoose";
import mongoose from "mongoose";
import {DeviceOp} from "./dbOperations/deviceop";
import {EnergyOp} from "./dbOperations/energyop";
import {IEnergy} from "./models/energyInterface";
const WebSocket1 = require('ws');
const wws = new WebSocket1.Server({port:8081})

const socketIO = require('socket.io');

require("dotenv").config({path:"./.env"});
var WebSocketServer = require('websocket').server;
var amqp = require('amqplib/callback_api');
var http = require('http');

const deviceService = new DeviceOp();
const energyService = new EnergyOp();
//const express = require("express");
async function device(id){
    const dev = await deviceService.findById(id);
    return dev;
}
const newServer = new Server(parseInt(process.env.PORT) || 5000);


newServer.listen();

newServer.connectToDataBase();


var server1 = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server1.listen(8079, function() {
    console.log((new Date()) + ' Server is listening on port 8079');
});

var server2 = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server2.listen(3000, function() {
    console.log((new Date()) + ' Server is listening on port 3000');
});

var io = socketIO(server2);

io.on('connection', (socket) => {
   socket.on('join', (data)=>{
      socket.join(data.room);
      socket.broadcast.to(data.room).emit('user joined');
   });
   socket.on('message', (data) =>{
       console.log(data);
       io.in(data.room).emit('new message', {user: data.user, message:data.message});
   })
});

var seerver = new WebSocketServer({
    httpServer: server1,

    autoAcceptConnections: false
});

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

async function con() {
    wws.on('connection',(ws) => {
    seerver.on('request', function (request) {
        if (!originIsAllowed(request.origin)) {
            // Make sure we only accept requests from an allowed origin
            request.reject();
            console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
            return;
        }
        var connection = request.accept('echo-protocol', request.origin);
        console.log((new Date()) + ' Connection accepted.');
        amqp.connect('amqps://rcrbcsxn:y9aq9GTDCdYt4zc4KIJfBo-WapRfQfb2@sparrow.rmq.cloudamqp.com/rcrbcsxn', function (error0, connection) {
            if (error0) {
                console.log("server " + error0);
                throw error0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    console.log("server" + error1)
                    throw error1;
                }
                var queue = 'hello';

                channel.assertQueue(queue, {
                    durable: false
                });
                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

                channel.consume(queue, async function (message) {
                    const arr = message.content.toString().split(" ");
                    const deviceId = arr[3].slice(0, -1);
                    const timestamp = arr[1].slice(0, -1);
                    const number = arr[5].slice(0, -1);
                    const ener = <IEnergy>{timestamp:timestamp, deviceId:deviceId, measurementValue:number};
                    const op = await energyService.createObject(ener);
                    //console.log(deviceId);

                    const dev = await deviceService.findById(deviceId);
                    const energy = await energyService.findMax();

                    if(dev.maxHConsumption < Number(number)){
                        console.log("a ajuns aici");
                        ws.send(Number(number));
                    }




                    //console.log(dev);

                    console.log(number);
                    console.log(" [x] Received %s", message.content.toString());
                }, {
                    noAck: true
                });
            });


        });

        connection.on('close', function (reasonCode, description) {
            console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        });
    });});
}
con();