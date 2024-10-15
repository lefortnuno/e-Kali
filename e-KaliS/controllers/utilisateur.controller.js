"use strict";
const Utilisateur = require("../models/utilisateur.model");
const Loka = require("../models/loka.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tmp = 3 * 24 * 60 * 60 * 1000;

const createToken = (account) => {
  return jwt.sign({ account }, process.env.TOKEN_SECRET, { expiresIn: tmp });
};

module.exports.addUtilisateur = (req, res) => {
  let { nom, prenom, pwd, idPS } = req.body;
  pwd = bcrypt.hashSync(pwd, 10);
  const newUtilisateur = { nom, prenom, pwd, idPS };

  Utilisateur.addUtilisateur(newUtilisateur, (err, resp) => {
    if (err) {
      res.send(err);
    } else {
      res.send(resp);
    }
  });
};

module.exports.loginUtilisateur = (req, res) => {
  let { idPS, pwd } = req.body;

  Utilisateur.loginUtilisateur({ idPS }, (err, resp) => {
    if (!err) {
      if (resp.length != 0) {
        const mdp = resp[0].pwd;
        const validePwd = bcrypt.compareSync(pwd, mdp);

        if (validePwd) {
          const token = createToken(resp);
          const idM = resp[0].id;
          initializeUserLokas(idM);

          res.send({
            success: true,
            token,
            user: resp,
            message: "Connecté à eKali!",
          });
        } else {
          res.send({ success: false, message: "Mot de passe incorrect!" });
        }
      } else {
        res.send({ success: false, message: "Identifiant incorrect!" });
      }
    } else {
      res.send({ success: false, message: err });
    }
  });
};

module.exports.getAllUtilisateurs = (req, res) => {
  Utilisateur.getAllUtilisateurs((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getMyTotalOfUser = (req, res) => {
  Utilisateur.getMyTotalOfUser((err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.getIdUtilisateur = (req, res) => {
  Utilisateur.getIdUtilisateur(req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.updateUtilisateur = (req, res) => {
  let { nom, prenom, idPS, pwd } = req.body;
  pwd = bcrypt.hashSync(pwd, 10);
  const updateUtilisateur = { nom, prenom, idPS, pwd };

  Utilisateur.updateUtilisateur(
    updateUtilisateur,
    req.params.id,
    (err, resp) => {
      if (!err) {
        res.send(resp);
      } else {
        res.send(err);
      }
    }
  );
};

module.exports.deleteUtilisateur = (req, res) => {
  Utilisateur.deleteUtilisateur(req.params.id, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

module.exports.searchUtilisateur = (req, res) => {
  const { val } = req.body;

  Utilisateur.searchUtilisateur({ val }, (err, resp) => {
    if (!err) {
      res.send(resp);
    } else {
      res.send(err);
    }
  });
};

const initializeUserLokas = (idM) => {
  Loka.getAllMyLoka(idM, (err, lokas) => {
    if (!err) {
      if (lokas.length < 21) {
        const defaultLokas = [
          { nom: "Viande Hachée", idM },
          { nom: "Poulet Frite", idM },
          { nom: "Poisson Frite", idM },
          { nom: "Riz", idM },
          { nom: "Pâtes", idM },
          { nom: "Pommes de terre", idM },
          { nom: "Légume de Viande", idM },
          { nom: "Légume de Poulet", idM },
          { nom: "Oeufs", idM },
          { nom: "Riz Cantonais", idM },
          { nom: "Légume", idM },
          { nom: "Salade de Fruit", idM },
          { nom: "Spaghetti", idM },
          { nom: "Haricots", idM },
          { nom: "Poulet Sauce", idM },
          { nom: "Poisson Sauce", idM },
          { nom: "Céréales", idM },
          { nom: "Yaourt/Pain/Lait", idM },
          { nom: "Lentilles", idM },
          { nom: "Thé/Café", idM },
          { nom: "Mouton", idM },
        ];
        const itemsToInsert = defaultLokas.slice(0, 21 - lokas.length);
        itemsToInsert.forEach((newLoka) => {
          Loka.addLoka(newLoka, (err, result) => {
            if (err) {
              console.error("Erreur lors de l'ajout de l'élément Loka :", err);
            }
          });
        });
      }
    } else {
      console.error("Erreur lors de la récupération des Lokas :", err);
    }
  });
};
