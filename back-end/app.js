const express = require("express");
const startGraphqlRouter = require("./graphql/router");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Api Live!!!"));

const startAPI = async () => {
    await startGraphqlRouter(app);
    app.listen({ port: 7000 }, () => console.log("Api running in port 7000"));
}

startAPI();
