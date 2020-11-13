const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const deal = require("./routes/deal");
const authentication = require("./routes/authentication");
const cors = require("cors");
const app = express();

//body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/deals', deal);
app.use('/auth', authentication);

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "https://example.com",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }});

let interval;
const getApiAndEmit = socket => {
  const response = new Date();
  socket.emit("timer", response);
};

io.on("connection", (socket) => {
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
