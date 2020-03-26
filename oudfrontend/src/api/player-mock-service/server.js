const express = require("express");
const app = express();
const server = require("http").Server(app);
const port = process.env.port || 8080;

const path = require("path");
const fs = require("fs");
const io = require("socket.io")(server);
const ss = require("socket.io-stream");
const playlist = path.join(__dirname, `./player-mock-service/tracks`);
console.log(playlist);
// app.use(express.static(path.join(__dirname, "public")));

server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});

io.on("connection", socket => {
  socket.emit("start", { hello: "world!" });
  socket.on("stream", data => {
    fs.readdir(playlist, function(err, files) {
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }
      console.log(files);
      files.forEach(function(track) {
        let trackName = playlist + "/" + track;
        let stream = ss.createStream();
        ss(socket).emit("audio-stream", stream, { name: trackName });
        fs.createReadStream(trackName).pipe(stream);
        socket.emit("track", {
          track: "Hello! we are transimitted a track right now"
        });
      });
    });
    // const playlist = path.join(
    //   __dirname,
    //   `./player-mock-service/tracks/Wegz.mp3`
    // );
    // let trackName = playlist + "/Azraeel.mp3";
    // let stream = ss.createStream();
    // ss(socket).emit("audio-stream", stream, { name: playlist });
    // fs.createReadStream(playlist).pipe(stream);
  });
});
