const express = require("express");
const expressRouter = require("./routers/express-router");
const startGraphqlRouter = require("./routers/graphql-router");

const app = express();

const startAPI = async () => {
    app.use(express.json());

    app.get("/", (req, res) => res.send("Api Live!!!"));

    app.use("/express", expressRouter);
    await startGraphqlRouter(app);

    app.listen({ port: 7000 }, () => console.log("Api running in port 7000"));
}

startAPI();