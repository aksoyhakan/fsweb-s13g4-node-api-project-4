require("dotenv").config();

const express = require("express");
const Models = require("./model/model");
const {
  validateUser,
  registerCheck,
  loginCheck,
} = require("./middleware/middleware");
const server = express();

server.use(express.json());

server.get("/api/kullanicilar", validateUser, loginCheck, (req, res) => {
  Models.getUsers()
    .then((response) => res.status(200).json(response))
    .catch((err) => next({ code: 500, message: "database problem" }));
});

server.post("/api/kayitol", registerCheck, (req, res) => {
  Models.register(req.body)
    .then((response) => res.status(201).json(response))
    .catch((err) => next({ code: 500, message: "database problem" }));
});

server.post("/api/giris", validateUser, (req, res) => {
  Models.logIn(req.body);
  res.status(200).json({
    message: `${process.env.MESSAGE} ${req.body.kullaniciadi}` || "Welcome",
  });
});

server.use((err, req, res, next) => {
  res.status(err.code).json({ message: err.message });
});

module.exports = server;
