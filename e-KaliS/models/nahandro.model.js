let dbConn = require("../config/db");

let Nahandro = function (nahandro) {
  this.id = nahandro.id;
  this.nom = nahandro.nom;
  this.coms = nahandro.coms;
  this.idL = nahandro.idL;
};

const reqSQL = `SELECT 
                nahandro.id as id, 
                nahandro.nom as nnom, 
                loka.nom as lnom,   
                coms, idL
                FROM loka, nahandro 
                WHERE (loka.id = nahandro.idL) `;
const myReq = ` AND idM = ? AND idL = ? `;
const ordre = ` ORDER BY id DESC `;

Nahandro.addNahandro = (newNahandro, result) => {
  dbConn.query("INSERT INTO nahandro SET ?", newNahandro, (err, res) => {
    if (!err) {
      result(null, { success: true, message: "Ajout reussi !" });
    } else {
      result(err, null);
    }
  });
};

Nahandro.getIdNahandro = (id, result) => {
  dbConn.query(reqSQL + ` AND Nahandro.id = ? `, id, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      if (res.length !== 0) {
        result(null, res);
      } else {
        result(null, res);
      }
    }
  });
};

Nahandro.updateMyNahandro = (updateNahandro, id, result) => {
  Nahandro.getIdNahandro(id, (err, resId) => {
    if (resId.length != 0) {
      dbConn.query(
        `UPDATE nahandro SET ? WHERE id = ${id}`,
        updateNahandro,
        function (err, res) {
          if (err) {
            result(err, null);
          } else {
            result(null, { success: true, message: "Modification reussi !" });
          }
        }
      );
    } else {
      result(null, {
        success: false,
        message: `Echec de la modification! Nahandro non existant!`,
      });
    }
  });
};

Nahandro.deleteMyNahandro = (id, result) => {
  Nahandro.getIdNahandro(id, (err, resId) => {
    if (resId.length != 0) {
      dbConn.query(
        `DELETE FROM Nahandro WHERE Nahandro.id = ${id}`,
        function (err, res) {
          if (err) {
            result(err, null);
          } else {
            result(null, { success: true });
          }
        }
      );
    } else {
      result(null, {
        success: false,
        message: `Echec de suppression! Nahandro non existant!`,
      });
    }
  });
};

module.exports = Nahandro;
