"use strict";
const Nahandro = require("../models/nahandro.model");

module.exports.addNahandro = (req, res) => {
  let { nom, idL, coms } = req.body;
  const newNahandro = { nom, idL, coms };

  Nahandro.addNahandro(newNahandro, (err, resp) => {
    if (err) {
      res.send(err);
    } else {
      res.send(resp);
    }
  });
};

module.exports.getIdNahandro = (req, res) => {
  Nahandro.getIdNahandro(req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.updateMyNahandro = (req, res) => {
  let { nom, coms } = req.body;
  const updateNahandro = { nom, coms };

  Nahandro.updateMyNahandro(updateNahandro, req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.deleteMyNahandro = (req, res) => {
  Nahandro.deleteMyNahandro(req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};
