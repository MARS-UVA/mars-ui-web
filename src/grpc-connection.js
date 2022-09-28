/*
Resources for setting up gRPC client connection:
- https://grpc.io/docs/languages/node/basics/
- https://daily.dev/blog/build-a-grpc-service-in-nodejs
*/

const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "../protos/jetsonrpc.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const jetsonrpc = grpc.loadPackageDefinition(packageDefinition).jetsonrpc;

const stub = new jetsonrpc.JetsonRPC(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

// console.log(jetsonrpc)
// console.log(jetsonrpc.DriveStateEnum.AUTONOMY)
const t = jetsonrpc.DriveStateEnum.type.value[2].number;
console.log(t);

stub.ChangeDriveState({"dse": t}, function(err, voidresponse) {
    if(err) {
        // console.log("got err=" + err);
        console.log("got err: ");
        console.log(err);
    } else {
        // console.log("got resp=" + voidresponse);
        console.log("got resp: ");
        console.log(voidresponse);
    }
})