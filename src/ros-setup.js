import * as ROSLIB from 'roslib';


// Set up ROS connection
// ----------------------

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
