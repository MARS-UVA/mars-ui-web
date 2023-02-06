// https://dev.to/bravemaster619/how-to-use-socket-io-client-correctly-in-react-app-o65

import React from "react";
import socketio from "socket.io-client";

export const socket = socketio.connect("http://localhost:50050"); // TODO this should probably be a paramter somewhere
export const SocketContext = React.createContext();
