# Web-Based MARS-UI

## Component Map
![image](https://user-images.githubusercontent.com/47730411/213934394-021b2c68-7480-42ff-a2e3-8f96591e2ac9.png)
![image](https://user-images.githubusercontent.com/47730411/213934400-5c73b3a3-a1d9-4e89-9e71-0584eb417cb2.png)

### Notes on GRPC Intro (https://grpc.io/docs/what-is-grpc/introduction/):

GRPC is used to communicate between the server (the robot codebase in C++) and the client (the webui written in Node JS).

GRPC is based around the idea of defining a service, specifying the methods that can be called remotely with their parameters and return types. 

On the robot server side, the server implements this interface and runs a gRPC server to handle client calls. On the client side, the client has a stub/client that provides the same methods as the server.

The client sends proto requests and the server sends proto-response.

The first step when working with protocol buffers is to define the structure for the data you want to serialize in a proto file: this is an ordinary text file with a .proto extension. Protocol buffer data is structured as messages, where each message is a small logical record of information containing a series of name-value pairs called fields. Note that the 1, 2, 3 variable assignment is not values but maybe indexs of the fields?

![image](https://user-images.githubusercontent.com/47730411/205508775-7c5066a3-550b-455f-ad16-f2db48716b37.png)

Then, once you’ve specified your data structures, you use the protocol buffer compiler protoc to generate data access classes in your preferred language(s) from your proto definition. These provide simple accessors for each field, like name() and set_name(), as well as methods to serialize/parse the whole structure to/from raw bytes. (GRPC is will auto generate these). Protoc also generates server and client code based on the proto file.

You define gRPC services in ordinary proto files, with RPC method parameters and return types specified as protocol buffer messages:

![image](https://user-images.githubusercontent.com/47730411/205508981-3e93d5a8-637d-44f0-ac93-0fe43ea4847d.png)

