const express = require("express");
const expressRouter = require("./express/router");
const startGraphqlRouter = require("./graphql/router");
const cors = require("cors");

const app = express();
app.use(cors()); // [ ] configure this right.

const startAPI = async () => {
    app.use(express.json());

    app.get("/", (req, res) => res.send("Api Live!!!"));

    app.use("/express", expressRouter);
    await startGraphqlRouter(app);

    app.listen({ port: 7000 }, () => console.log("Api running in port 7000"));
}

startAPI();