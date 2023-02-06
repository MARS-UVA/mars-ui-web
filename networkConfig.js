exports.GRPC_SERVER_ADDRESS = "localhost";
// exports.GRPC_SERVER_ADDRESS = "172.27.142.247";
exports.PROXY_SERVER_PORT = 50050; // SocketClientContext has this value hardcoded! Make sure to change that if this value changes
exports.GRPC_SERVER_PORT = 50051;
exports.WEBSITE_PORT = 3000; // needed to set CORS rule

// export { GRPC_SERVER_ADDRESS, PROXY_SERVER_PORT, GRPC_SERVER_PORT, WEBSITE_PORT }; // only works if using ES modules
