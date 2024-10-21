const express = require("express");
const cors = require("cors");
const expressRouter = require("./express/router");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/express", expressRouter);

app.get("/", (req, res) => res.send("Api Live!!!"));

app.listen({ port: 7000 }, () => console.log("Api running in port 7000"));