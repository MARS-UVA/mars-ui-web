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

// Set state service
// ------------------


// Get state service
// ------------------


// Publish motor commands - works!
// -----------------------

var motorCommandPublisher = new ROSLIB.Topic({
    ros : ros,
    name : '/motor/output',
    messageType : 'hero_board/MotorCommand'
});

var message = new ROSLIB.Message({values: [0, 1, 2, 3, 4, 5, 6, 7]});
motorCommandPublisher.publish(message);

export { motorCommandPublisher };


// Start action service
// ---------------------

var startActionClient = new ROSLIB.Service({
    ros : ros,
    name : '/start_action',
    serviceType : 'actions/StartAction'
  });

  var request = new ROSLIB.ServiceRequest({
    action_description_json: "{ \
        \"name\": \"raise_ladder\", \
        \"update_delay\": 0.05, \
        \"speed\": 50, \
        \"raised_angle\": 52.0 \
    }"
  });

  startActionClient.callService(request, function(result) {
    console.log('Service called with result ' + result + '.');
  });

export { startActionClient };

/*
var listener = new ROSLIB.Topic({
    ros : ros,
    name : '/listener',
    messageType : 'std_msgs/String'
});

listener.subscribe(function(message) {
    console.log('Received message on ' + listener.name + ': ' + message.data);
    listener.unsubscribe();
}); */

var talker = new ROSLIB.Topic({
    ros : ros,
    name : '/talker',
    messageType : 'std_msgs/String'
});

var message = new ROSLIB.Message({data: "test publishing"});
talker.publish(message);

export { talker };