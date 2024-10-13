const router = require("express").Router();
const NahandroController = require("../controllers/nahandro.controller");
const user = require("../middlewares/user.middleware");

router.post("/", user.checkUtilisateur, NahandroController.addNahandro);

router.get("/:id", user.checkUtilisateur, NahandroController.getIdNahandro);

router.put("/:id", user.checkUtilisateur, NahandroController.updateMyNahandro);

router.delete(
  "/:id",
  user.checkUtilisateur,
  NahandroController.deleteMyNahandro
);

module.exports = router;
