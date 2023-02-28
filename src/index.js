/* eslint-disable */
import app from "./app";
import {ioConnect} from "./utils/socketio";
import httpServer from "http";


const http = httpServer.Server(app);
const port = process.env.PORT || 5000;

try {
  http.listen(port, () => {
    console.log(`server running on port ${port} `);
  });
  ioConnect(http)
} catch (error) {
  console.log(error);

}

export default http;

