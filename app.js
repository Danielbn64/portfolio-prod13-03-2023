"use strict";
//Crear un servidor:
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//Archivos de rutas:
const projectRoutes = require("./routes/project");
const userRoutes = require("./routes/user");
const emailRoutes = require("./routes/email");

//Middlewares:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var path = require('path');

// Configurar cabeceras y cors:
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://daniload.com");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Rutas:
app.use("/", express.static("client", { redirect: false }));
app.use("/api", projectRoutes);
app.use("/api", userRoutes);
app.use("/api", emailRoutes);
app.get("*", function (req, res, next) {
  return res.sendFile(path.resolve("client/index.html"));
});

//Exportar:
module.exports = app;
