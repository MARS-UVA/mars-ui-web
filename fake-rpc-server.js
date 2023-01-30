const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "protos/jetsonrpc.proto";
const SERVER_PORT = 50051;
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const jetsonrpc = grpc.loadPackageDefinition(packageDefinition).jetsonrpc;
const jetsonrpcService = jetsonrpc.JetsonRPC;

// Client and server examples for client/server streaming rpcs: https://adityasridhar.com/posts/how-to-effectively-use-grpc-streams-in-nodejs

var server = new grpc.Server();
server.addService(jetsonrpcService.service, {

  sendDdCommand: (call, callback) => {
    call.on("data", (command) => {
      var decoded = [...command.values];
      console.log(`Got DD command: ${decoded}`);
    });
    call.on("end", (command) => {
      // call.end();
      callback(null, {}); // The first parameter in callback() indicates if there's an error. If there's no error, pass 'null'. 
    });
  },

  changeDriveState: (call, callback) => {
    var stateText = call.request.dse;
    var stateNumber = jetsonrpc.DriveStateEnum.type.value.find(t => t.name == stateText).number;
    console.log(`Changing drive state to ${stateText} (state number ${stateNumber})`);
    return callback(null, {});
  },

  startAction: (call, callback) => {
    var actionDescriptionText = call.request.text;
    console.log(`Starting action: ${actionDescriptionText}`);
    return callback(null, {});
  },

  emergencyStop: (call, callback) => {
    console.log("Emergency stop!");
    return callback(null, {});
  },

  streamHeroFeedback: (call) => {
    setInterval(() => {
      // TODO: what happens to this interval when streamHeroFeedback is called 
      // repeatedly? This happens when the client wants to change the data transmission rate

      currents = new Uint8Array(11);
      for(var i = 0; i < currents.length; i++) {
        currents[i] = Math.floor(Math.random() * 100);
      }
      angleL = Math.floor(Math.random() * 90) + 0.5;
      angleR = Math.floor(Math.random() * 90) + 0.5;
      var feedback = {
        "currents": currents,
        "bucketLadderAngleL": angleL,
        "bucketLadderAngleR": angleR,
        "depositBinRaised": 0,
        "depositBinLowered": 1
      };
      call.write(feedback);
    }, call.request.rate);

    // call.end();
  },

});


server.bindAsync(
  `0.0.0.0:${SERVER_PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if(error) {
      console.log(`Error starting server: ${error}`);
    } else {
      console.log(`Server running at http://0.0.0.0:${port}`);
      server.start();
    }
  }
);
