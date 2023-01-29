import * as ROSLIB from 'roslib';

var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
});

ros.on('connection', function() {
    console.log('Connected to websocket server.');
});

ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function() {
    console.log('Connection to websocket server closed.');
});

// Subscribing to a Topic
// ----------------------

var listener = new ROSLIB.Topic({
    ros : ros,
    name : '/listener',
    messageType : 'std_msgs/String'
});

listener.subscribe(function(message) {
    console.log('Received message on ' + listener.name + ': ' + message.data);
    listener.unsubscribe();
});

var talker = new ROSLIB.Topic({
    ros : ros,
    name : '/talker',
    messageType : 'std_msgs/String'
});

var message = new ROSLIB.Message({data: "test publishing"});
talker.publish(message);

export { talker };