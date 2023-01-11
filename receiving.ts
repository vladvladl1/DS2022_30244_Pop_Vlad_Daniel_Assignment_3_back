var amqp = require('amqplib/callback_api');

amqp.connect('amqps://rcrbcsxn:y9aq9GTDCdYt4zc4KIJfBo-WapRfQfb2@sparrow.rmq.cloudamqp.com/rcrbcsxn', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});

