const router = require("express").Router();
const UtilisateurController = require("../controllers/utilisateur.controller");
const admin = require("../middlewares/admin.middleware");
const user = require("../middlewares/user.middleware");

router.post("/", UtilisateurController.addUtilisateur);
router.post("/seConnecter", UtilisateurController.loginUtilisateur);
router.post(
  "/recherche",
  admin.checkUtilisateur,
  UtilisateurController.searchUtilisateur
);

router.get(
  "/",
  admin.checkUtilisateur,
  UtilisateurController.getAllUtilisateurs
);
router.get("/userTtl", admin.checkUtilisateur, UtilisateurController.getMyTotalOfUser);
router.get(
  "/:id",
  user.checkUtilisateur,
  UtilisateurController.getIdUtilisateur
);

router.put(
  "/:id",
  user.checkUtilisateur,
  UtilisateurController.updateUtilisateur
);

router.delete(
  "/:id",
  admin.checkUtilisateur,
  UtilisateurController.deleteUtilisateur
);

module.exports = router;
