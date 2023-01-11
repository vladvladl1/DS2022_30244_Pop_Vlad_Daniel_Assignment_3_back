var amqp = require('amqplib/callback_api');



amqp.connect('amqps://rcrbcsxn:y9aq9GTDCdYt4zc4KIJfBo-WapRfQfb2@sparrow.rmq.cloudamqp.com/rcrbcsxn', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        var queue = 'hello';
        var msg = 'salut lume mare';

        channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() {
        connection.close();
        process.exit(0)
    }, 500);
});
