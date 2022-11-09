/**
 * @fileoverview gRPC-Web generated client stub for jetsonrpc
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.jetsonrpc = require('./jetsonrpc_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.jetsonrpc.JetsonRPCClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.jetsonrpc.JetsonRPCPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.jetsonrpc.DriveState,
 *   !proto.jetsonrpc.Void>}
 */
const methodDescriptor_JetsonRPC_ChangeDriveState = new grpc.web.MethodDescriptor(
  '/jetsonrpc.JetsonRPC/ChangeDriveState',
  grpc.web.MethodType.UNARY,
  proto.jetsonrpc.DriveState,
  proto.jetsonrpc.Void,
  /**
   * @param {!proto.jetsonrpc.DriveState} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.jetsonrpc.Void.deserializeBinary
);


/**
 * @param {!proto.jetsonrpc.DriveState} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.jetsonrpc.Void)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.jetsonrpc.Void>|undefined}
 *     The XHR Node Readable Stream
 */
proto.jetsonrpc.JetsonRPCClient.prototype.changeDriveState =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/jetsonrpc.JetsonRPC/ChangeDriveState',
      request,
      metadata || {},
      methodDescriptor_JetsonRPC_ChangeDriveState,
      callback);
};


/**
 * @param {!proto.jetsonrpc.DriveState} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.jetsonrpc.Void>}
 *     Promise that resolves to the response
 */
proto.jetsonrpc.JetsonRPCPromiseClient.prototype.changeDriveState =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/jetsonrpc.JetsonRPC/ChangeDriveState',
      request,
      metadata || {},
      methodDescriptor_JetsonRPC_ChangeDriveState);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.jetsonrpc.ActionDescription,
 *   !proto.jetsonrpc.Void>}
 */
const methodDescriptor_JetsonRPC_StartAction = new grpc.web.MethodDescriptor(
  '/jetsonrpc.JetsonRPC/StartAction',
  grpc.web.MethodType.UNARY,
  proto.jetsonrpc.ActionDescription,
  proto.jetsonrpc.Void,
  /**
   * @param {!proto.jetsonrpc.ActionDescription} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.jetsonrpc.Void.deserializeBinary
);


/**
 * @param {!proto.jetsonrpc.ActionDescription} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.jetsonrpc.Void)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.jetsonrpc.Void>|undefined}
 *     The XHR Node Readable Stream
 */
proto.jetsonrpc.JetsonRPCClient.prototype.startAction =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/jetsonrpc.JetsonRPC/StartAction',
      request,
      metadata || {},
      methodDescriptor_JetsonRPC_StartAction,
      callback);
};


/**
 * @param {!proto.jetsonrpc.ActionDescription} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.jetsonrpc.Void>}
 *     Promise that resolves to the response
 */
proto.jetsonrpc.JetsonRPCPromiseClient.prototype.startAction =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/jetsonrpc.JetsonRPC/StartAction',
      request,
      metadata || {},
      methodDescriptor_JetsonRPC_StartAction);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.jetsonrpc.Void,
 *   !proto.jetsonrpc.Void>}
 */
const methodDescriptor_JetsonRPC_EmergencyStop = new grpc.web.MethodDescriptor(
  '/jetsonrpc.JetsonRPC/EmergencyStop',
  grpc.web.MethodType.UNARY,
  proto.jetsonrpc.Void,
  proto.jetsonrpc.Void,
  /**
   * @param {!proto.jetsonrpc.Void} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.jetsonrpc.Void.deserializeBinary
);


/**
 * @param {!proto.jetsonrpc.Void} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.jetsonrpc.Void)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.jetsonrpc.Void>|undefined}
 *     The XHR Node Readable Stream
 */
proto.jetsonrpc.JetsonRPCClient.prototype.emergencyStop =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/jetsonrpc.JetsonRPC/EmergencyStop',
      request,
      metadata || {},
      methodDescriptor_JetsonRPC_EmergencyStop,
      callback);
};


/**
 * @param {!proto.jetsonrpc.Void} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.jetsonrpc.Void>}
 *     Promise that resolves to the response
 */
proto.jetsonrpc.JetsonRPCPromiseClient.prototype.emergencyStop =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/jetsonrpc.JetsonRPC/EmergencyStop',
      request,
      metadata || {},
      methodDescriptor_JetsonRPC_EmergencyStop);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.jetsonrpc.Rate,
 *   !proto.jetsonrpc.HeroFeedback>}
 */
const methodDescriptor_JetsonRPC_StreamHeroFeedback = new grpc.web.MethodDescriptor(
  '/jetsonrpc.JetsonRPC/StreamHeroFeedback',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.jetsonrpc.Rate,
  proto.jetsonrpc.HeroFeedback,
  /**
   * @param {!proto.jetsonrpc.Rate} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.jetsonrpc.HeroFeedback.deserializeBinary
);


/**
 * @param {!proto.jetsonrpc.Rate} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.jetsonrpc.HeroFeedback>}
 *     The XHR Node Readable Stream
 */
proto.jetsonrpc.JetsonRPCClient.prototype.streamHeroFeedback =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/jetsonrpc.JetsonRPC/StreamHeroFeedback',
      request,
      metadata || {},
      methodDescriptor_JetsonRPC_StreamHeroFeedback);
};


/**
 * @param {!proto.jetsonrpc.Rate} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.jetsonrpc.HeroFeedback>}
 *     The XHR Node Readable Stream
 */
proto.jetsonrpc.JetsonRPCPromiseClient.prototype.streamHeroFeedback =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/jetsonrpc.JetsonRPC/StreamHeroFeedback',
      request,
      metadata || {},
      methodDescriptor_JetsonRPC_StreamHeroFeedback);
};


module.exports = proto.jetsonrpc;

