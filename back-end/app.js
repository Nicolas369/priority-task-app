const express = require("express");
<<<<<<< HEAD
const startGraphqlRouter = require("./graphql/router");
=======
>>>>>>> v2.0.0_REST
const cors = require("cors");
const expressRouter = require("./express/router");

const app = express();

app.use(cors());
app.use(express.json());
<<<<<<< HEAD

app.get("/", (req, res) => res.send("Api Live!!!"));

const startAPI = async () => {
    await startGraphqlRouter(app);
    app.listen({ port: 7000 }, () => console.log("Api running in port 7000"));
}

startAPI();
=======
app.use("/express", expressRouter);

app.get("/", (req, res) => res.send("Api Live!!!"));

app.listen({ port: 7000 }, () => console.log("Api running in port 7000"));
>>>>>>> v2.0.0_REST
