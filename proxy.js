/*
Resources for setting up gRPC client connection:
- https://grpc.io/docs/languages/node/basics/
- https://daily.dev/blog/build-a-grpc-service-in-nodejs
*/
const GRPC_SERVER_PORT = 50051;
const PROXY_SERVER_PORT = 50050;

const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "protos/jetsonrpc.proto";
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const jetsonrpcService = grpc.loadPackageDefinition(packageDefinition).jetsonrpc;

const stub = new jetsonrpcService.JetsonRPC(
  `localhost:${GRPC_SERVER_PORT}`,
  grpc.credentials.createInsecure()
);


var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(cors());


app.get("/", (req, res) => {
  console.log("/");
  res.send("Hello world!");
});

app.post("/ChangeDriveState", (req, res) => {
  console.log("/ChangeDriveState");
  // var e = jetsonrpc.DriveStateEnum.type.value[2].number;
  stub.ChangeDriveState(req.body, function(err, response) {
    if(err) {
      console.log("  grpc err:", response);
      res.send(err);
    } else {
      console.error("  grpc response:", response);
      res.send(response);
    }
  })
});

app.post("/EmergencyStop", (req, res) => {
  console.log("/EmergencyStop");
  stub.EmergencyStop({}, function(err, response) {
    if(err) {
      console.log("  grpc err:", err);
      res.send(err);
    } else {
      res.send(response);
    }
  })
});


var server = app.listen(PROXY_SERVER_PORT, function () {
  var host = server.address().address
  var port = server.address().port
  
  console.log("mars-ui-web proxy server listening at http://%s:%s", host, port)
})
