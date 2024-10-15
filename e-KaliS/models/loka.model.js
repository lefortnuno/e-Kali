let dbConn = require("../config/db");

let Loka = function (loka) {
  this.id = loka.id;
  this.nom = loka.nom;
  this.idM = loka.idM;
};

const reqSQL = `SELECT 
                loka.id as id, 
                loka.nom as lnom, 
                mpampiasa.nom as mnom,  
                prenom, idM
                FROM mpampiasa, loka 
                WHERE (mpampiasa.id = loka.idM) `;
const myReq = ` AND idM = ? `;
const ordre = ` ORDER BY id ASC `;

Loka.addLoka = (newLoka, result) => {
  dbConn.query("INSERT INTO loka SET ?", newLoka, (err, res) => {
    if (!err) {
      result(null, { success: true, message: "Ajout reussi!" });
    } else {
      result(err, null);
    }
  });
};

Loka.getAllMyLoka = (id, result) => {
  dbConn.query(reqSQL + myReq + ordre, id, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Loka.getIdLoka = (id, result) => {
  dbConn.query(reqSQL + ` AND loka.id = ? `, id, (err, res) => {
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

Loka.searchSomeLoka = (valeur, result) => {
  dbConn.query(
    reqSQL + myReq + ` AND loka.nom LIKE '%${valeur.val}%' ` + ordre,
    [valeur.idM],
    (err, res) => {
      if (err) {
        result({ err, message: "erreur !", success: false }, null);
      } else {
        if (res.length !== 0) {
          result(null, { res, message: "trouvé !", success: true });
        } else {
          result(null, { res, message: "Introuvable !", success: false });
        }
      }
    }
  );
};

Loka.updateMyLoka = (updateLoka, id, result) => {
  Loka.getIdLoka(id, (err, resId) => {
    if (resId.length != 0) {
      dbConn.query(
        `UPDATE loka SET ? WHERE id = ${id}`,
        updateLoka,
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
        message: `Echec de la modification! Loka non existant!`,
      });
    }
  });
};

Loka.deleteMyLoka = (id, result) => {
  Loka.getIdLoka(id, (err, resId) => {
    if (resId.length != 0) {
      dbConn.query(
        `DELETE FROM loka WHERE loka.id = ${id}`,
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
        message: `Echec de suppression! Loka non existant!`,
      });
    }
  });
};

Loka.filtreLoka = (valeur, result) => {
  dbConn.query(
    reqSQL +
      myReq +
      ` AND date between '${valeur.date1}' AND '${valeur.date2})' ` +
      ordre,
    [valeur.idM],
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Loka;
