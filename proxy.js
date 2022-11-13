/*
Resources for setting up gRPC client connection:
- https://grpc.io/docs/languages/node/basics/
- https://daily.dev/blog/build-a-grpc-service-in-nodejs
*/

/*
const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "protos/jetsonrpc.proto";
const GRPC_SERVER_PORT = 50051;
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
*/

// var t = jetsonrpc.DriveStateEnum.type.value[2].number;
// var t = 2;
// stub.ChangeDriveState({"dse": t}, function(err, voidresponse) {
//   if(err) {
//     console.log("got err: ", err);
//   } else {
//     console.log("got resp: ", voidresponse);
//   }
// })


const PROXY_SERVER_PORT = 50050;

var express = require('express');
var app = express();
var cors = require('cors')

app.use(cors());

app.get("/", (req, res) => {
  console.log("/");
  res.send("Hello world!");
});

app.post("/ChangeDriveState", (req, res) => {
  console.log("/ChangeDriveState");
  res.send("ChangeDriveState!");
});


var server = app.listen(PROXY_SERVER_PORT, function () {
  var host = server.address().address
  var port = server.address().port
  
  console.log("Example app listening at http://%s:%s", host, port)
})