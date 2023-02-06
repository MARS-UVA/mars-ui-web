/*
Resources for setting up gRPC client connection:
- https://grpc.io/docs/languages/node/basics/
- https://daily.dev/blog/build-a-grpc-service-in-nodejs

Good example of socket setup: https://www.valentinog.com/blog/socket-react/
*/

const networkConfig = require("./networkConfig");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "protos/jetsonrpc.proto";
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const jetsonrpcService = grpc.loadPackageDefinition(packageDefinition).jetsonrpc;

const stub = new jetsonrpcService.JetsonRPC(
  `${networkConfig.GRPC_SERVER_ADDRESS}:${networkConfig.GRPC_SERVER_PORT}`,
  grpc.credentials.createInsecure()
);


const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { 
    // see https://socket.io/docs/v4/handling-cors/
    origin: `http://localhost:${networkConfig.WEBSITE_PORT}`
  }
});


io.on("connection", (socket) => {
  console.log("Client connected!");
  
  // TODO could have socket topic for errors (and/or status for text display)
  
  // TODO does this process do something wasteful? (ie starting the call when this connection starts)
  const sendDdCommandCall = stub.sendDdCommand(function(err, response) {
    if(err) {
      console.error("  grpc error:", response);
      // res.send(err);
    } else {
      console.log("  grpc closed successfully");
      // res.end();
    }
  });

  const streamHeroFeedbackCall = stub.streamHeroFeedback({"rate": 1000});
  streamHeroFeedbackCall.on("data", (data) => {
    socket.emit("StreamHeroFeedback", data);
  })

  socket.on("SendDDCommand", (data) => {
    console.log("SendDDCommand:", data);
    sendDdCommandCall.write(data);
  });

  socket.on("ChangeDriveState", (data) => {
    console.log("ChangeDriveState:", data);
    stub.ChangeDriveState(data, function(err, response) {
      if(err) {
        console.error("  grpc error:", response);
      }
    });
  });

  socket.on("StartAction", (data) => {
    console.log("StartAction:", data);
    stub.StartAction(data, function(err, response) {
      if(err) {
        console.error("  grpc error:", response);
      }
    });
  });

  socket.on("EmergencyStop", () => {
    console.log("EmergencyStop");
    stub.EmergencyStop({}, function(err, response) {
      if(err) {
        console.error("  grpc err:", err);
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected!");
  });
});


/*
app.get("/", (req, res) => {
  console.log("/");
  res.send("Hello world!");
});

app.post("/SendDDCommand", (req, res) => {
  console.log("/SendDDCommand");
  let call = stub.sendDdCommand(function(err, response) {
    if(err) {
      console.error("  grpc error:", response);
      // res.send(err);
    } else {
      console.log("  grpc closed successfully");
      // res.end();
    }
  });
  req.on("data", (chunk) => {
    console.log("stream got chunk:", chunk);
    call.write(chunk);
  });
  req.on("end", () => {
    console.log("stream done");
    call.end();
    // res.send(200);
  });
});

app.post("/ChangeDriveState", (req, res) => {
  console.log("/ChangeDriveState");
  // var e = jetsonrpc.DriveStateEnum.type.value[2].number;
  stub.ChangeDriveState(req.body, function(err, response) {
    if(err) {
      console.error("  grpc error:", response);
      res.send(err);
    } else {
      res.end();
    }
  })
});

app.post("/StartAction", (req, res) => {
  console.log("/StartAction");
  stub.StartAction(req.body, function(err, response) {
    if(err) {
      console.error("  grpc error:", response);
      res.send(err);
    } else {
      res.end();
    }
  });
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

app.post("/StreamHeroFeedback", (req, res) => {
  while(true) {
    res.write({"data": 1});

    // maybe check req.on("end")? like above
  }
  res.end();
});
*/


// app.listen(PROXY_SERVER_PORT, () => {
//   console.log("mars-ui-web proxy server listening on port %s", PROXY_SERVER_PORT)
// })
server.listen(networkConfig.PROXY_SERVER_PORT, () => console.log(`Listening on port ${networkConfig.PROXY_SERVER_PORT}`));
