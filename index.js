const express = require("express");
const server = express();
const morgan = require("morgan");
const projectRouter = require("./routers/projects-router");
const resourceRouter = require("./routers/resources-router");

server.use(morgan("dev"));
server.use(express.json());

server.use("/api/projects", projectRouter);
server.use("/api/resources", resourceRouter);

server.get("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});

server.listen(5000, () => {
  console.log("\n *** Server listening on port 5000 *** \n");
});
