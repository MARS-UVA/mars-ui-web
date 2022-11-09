/*
Resources for setting up gRPC client connection:
- https://grpc.io/docs/languages/node/basics/
- https://daily.dev/blog/build-a-grpc-service-in-nodejs
*/

// const grpc = require("@grpc/grpc-js");
// var protoLoader = require("@grpc/proto-loader");
import { JetsonRPCClient } from "./jetsonrpc_grpc_web_pb";
// import { JetsonRPCPromiseClient } from "./jetsonrpc_grpc_web_pb";


export const stub = new JetsonRPCClient(
  "http://localhost:8080",
  null, 
  null
);

// var t = jetsonrpc.DriveStateEnum.type.value[2].number;
var t = 2;
/** 
stub.ChangeDriveState({"dse": t}, function(err, voidresponse) {
  if(err) {
    console.log("got err: ", err);
  } else {
    console.log("got resp: ", voidresponse);
  }
}) */

export let heroValues = [];
export let dummyHeroValues = [];
/** 
let call = stub.streamHeroFeedback({rate: 1000});

// let call = stub.StreamHeroFeedback({rate: 1000});

call.on('data', function(herofeedback){
  heroValues = herofeedback;
  console.log(herofeedback);
  console.log(heroValues);
});

call.on('end', function(){
  console.log('Hero feedback done streaming.');
});
*/