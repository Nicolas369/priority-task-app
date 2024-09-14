const express = require("express");
const expressRouter = require("./router/express-router");

const app = express();
app.use(express.json());
app.use("/express", expressRouter);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(7000, () => console.log("backend running in port 7000"));