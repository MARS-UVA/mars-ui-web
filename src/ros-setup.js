import * as ROSLIB from 'roslib';


// Set up ROS connection
// ----------------------

var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
});

var connectionStatus = "Disconnected.";

ros.on('connection', function() {
    connectionStatus = 'Connected to websocket server.';
    console.log(connectionStatus);
});

ros.on('error', function(error) {
    connectionStatus = 'Error connecting to websocket server: ' + error;
    console.log(connectionStatus);
});

ros.on('close', function() {
    connectionStatus = 'Connection to websocket server closed.';
    console.log(connectionStatus);
});

export {connectionStatus};

// Publish motor commands
// -----------------------

var motorCommandPublisher = new ROSLIB.Topic({
    ros : ros,
    name : '/motor/output',
    messageType : 'hero_board/MotorCommand'
});

// example usage: 
/*
var message = new ROSLIB.Message({values: [0, 1, 2, 3, 4, 5, 6, 7]});
motorCommandPublisher.publish(message);
*/

export { motorCommandPublisher };


// Subcribe to HERO board feedback
// --------------------------------

var heroMotorCurrents;
var heroLadderAngle;
var heroDepositBinRaised;

var heroFeedbackSubscriber = new ROSLIB.Topic({
  ros : ros,
  name : '/motor/feedback',
  messageType : 'hero_board/HeroFeedback'
});

// example usage
/*
heroFeedbackSubscriber.subscribe(function(message) {
  heroMotorCurrents = message.currents;
  heroDepositBinRaised = message.depositBinRaised;
  heroLadderAngle = message.bucketLadderAngleR;

  console.log('Ros setup received angle: ' 
    + heroLadderAngle + "\ncurrents: " + heroMotorCurrents 
    + "\nraised: " + heroDepositBinRaised);
});
*/

// heroFeedbackSubscriber.unsubscribe();


export { heroFeedbackSubscriber };


// Set state service
// ------------------

var setStateClient = new ROSLIB.Service({
    ros : ros,
    name : '/set_state',
    serviceType : 'hero_board/SetState'
  });

  // example usage:
  /*
  var request = new ROSLIB.ServiceRequest({
    state: 0 // 0 corresponds to direct drive, 1 to autonomy, 2 to idle
  }); 

  setStateClient.callService(request, function(result) {
    console.log('Set state service called with result ' + result + '.');
  }); 
  */

export { setStateClient };


// Get state service
// ------------------

var getStateClient = new ROSLIB.Service({
    ros : ros,
    name : '/get_state',
    serviceType : 'hero_board/GetState'
  });

  // example usage:
  /*
  var request = new ROSLIB.ServiceRequest({}); // the request has no fields

  getStateClient.callService(request, function(result) {
    console.log('Get state service called with result ' + result + '.');
  });
  */

export { getStateClient };


// Emergency stop service
// -----------------------

var emergencyStopClient = new ROSLIB.Service({
  ros : ros,
  name : '/emergency_stop',
  serviceType : 'hero_board/EmergencyStop'
});

 // example usage:
  /*
  var request = new ROSLIB.ServiceRequest({
    stop_signal: 1 // send a 1 to send the stop signal
  }); 

  emergencyStopClient.callService(request, function(result) {
    console.log('E stop service called!');
  }); 
  */

export { emergencyStopClient };


// Start action service
// ---------------------

var startActionClient = new ROSLIB.Service({
    ros : ros,
    name : '/start_action',
    serviceType : 'actions/StartAction'
  });

  // example usage:
  /*
  var request = new ROSLIB.ServiceRequest({
    action_description_json: "{ \
        \"name\": \"raise_ladder\", \
        \"update_delay\": 0.05, \
        \"speed\": 50, \
        \"raised_angle\": 52.0 \
    }"
  });

  startActionClient.callService(request, function(result) {
    console.log('Start action service called with result ' + result + '.');
  });
  */

export { startActionClient };

// Subcribe to video from robot
// -----------------------------

var videoSubscriber = new ROSLIB.Topic({
  ros : ros,
  name : '/usb_cam/image_raw/compressed',
  messageType : 'sensor_msgs/CompressedImage'
});

export { videoSubscriber };