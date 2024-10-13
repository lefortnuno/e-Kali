"use strict";
const Loka = require("../models/loka.model");

module.exports.addLoka = (req, res) => {
  let { nom, idM } = req.body;
  const newLoka = { nom, idM };

  Loka.addLoka(newLoka, (err, resp) => {
    if (err) {
      res.send(err);
    } else {
      res.send(resp);
    }
  });
};

module.exports.getAllMyLoka = (req, res) => {
  Loka.getAllMyLoka(req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getIdLoka = (req, res) => {
  Loka.getIdLoka(req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.updateMyLoka = (req, res) => {
  let { nom } = req.body;
  const updateLoka = { nom };

  Loka.updateMyLoka(updateLoka, req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.deleteMyLoka = (req, res) => {
  Loka.deleteMyLoka(req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.searchSomeLoka = (req, res) => {
  const { val, idM } = req.body;

  Loka.searchSomeLoka({ val, idM }, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.filtreLoka = (req, res) => {
  const { date1, date2, idM } = req.body;
  const date = { date1, date2, idM };

  Loka.filtreLoka(date, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};
