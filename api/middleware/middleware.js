const Models = require("../model/model");

function validateUser(req, res, next) {
  Models.getFindUser(req.body)
    .then((response) => {
      response ? next() : next({ code: 404, message: "not found" });
    })
    .catch((err) => next({ code: 500, message: "database problem" }));
}

function registerCheck(req, res, next) {
  req.body.kullaniciadi && req.body.sifre
    ? next()
    : next({ code: 401, message: "username or password missing" });
}

function loginCheck(req, res, next) {
  Models.logUserFind(req.body)
    .then((response) => {
      response ? next() : next({ code: 406, message: "not logged" });
    })
    .catch((err) => next({ code: 500, message: "database problem" }));
}

module.exports = {
  validateUser,
  registerCheck,
  loginCheck,
};
